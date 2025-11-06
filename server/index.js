const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const newsRoutes = require('./routes/news');
const app = express();
const DATA = path.join(__dirname,'db','db.json');

// ============= MIDDLEWARES DE SEGURANÇA =============

// 1. Helmet - Protege contra vulnerabilidades comuns
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Permite embed de recursos externos
}));

// 2. CORS configurado adequadamente (não mais wildcard!)
// Lê origens permitidas do ambiente ou usa defaults
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = [
  'http://localhost:5173',  // Frontend dev
  'http://localhost:3000',  // Alternativa
  'http://127.0.0.1:5173',
  // Adiciona origens do ambiente (produção)
  ...allowedOriginsEnv.split(',').filter(o => o.trim())
];

console.log('🌐 CORS - Origens permitidas:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (mobile apps, Postman, etc)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('⚠️  Origem bloqueada pelo CORS:', origin);
      callback(new Error('Origin não permitida pelo CORS'));
    }
  },
  credentials: true, // Permite cookies e autenticação
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limiting - Previne ataques de força bruta
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 tentativas
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true, // Retorna info nos headers `RateLimit-*`
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requisições
  message: { error: 'Muitas requisições. Tente novamente mais tarde.' },
});

// Aplica rate limit geral em todas as rotas da API
app.use('/api/', apiLimiter);

app.use(express.json());
function readDB(){ return JSON.parse(fs.readFileSync(DATA,'utf8')); }
function writeDB(obj){ fs.writeFileSync(DATA, JSON.stringify(obj, null, 2)); }

// Middleware de autenticação - valida token nas requisições
const authenticateToken = (req, res, next) => {
  // Pega o token do header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação necessário' });
  }

  try {
    const db = readDB();
    // Busca o token na lista de sessões válidas
    const session = (db.sessions || []).find(s => s.token === token);
    
    if (!session) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    // Verifica se o token não expirou (24 horas de validade)
    const now = Date.now();
    const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (now - session.createdAt > TOKEN_EXPIRATION) {
      // Remove token expirado
      db.sessions = db.sessions.filter(s => s.token !== token);
      writeDB(db);
      return res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    }

    // Adiciona informações do usuário na requisição para uso posterior
    req.user = session.user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar token' });
  }
};
// Rotas públicas (não requerem autenticação)
app.get('/api/games', (req,res,next)=>{ 
  try {
    const db = readDB(); 
    res.json(db.games||[]);
  } catch (error) {
    next(error);
  }
});
app.get('/api/teams', (req,res,next)=>{ 
  try {
    const db = readDB(); 
    res.json(db.teams||[]);
  } catch (error) {
    next(error);
  }
});
app.get('/api/ranking', (req,res,next)=>{ 
  try {
    const db = readDB(); 
    res.json(db.ranking||[]);
  } catch (error) {
    next(error);
  }
});

// 🔒 Rota de Login com Rate Limiting e Bcrypt
app.post('/api/auth/login', loginLimiter, async (req,res)=>{
  const {email,password} = req.body;
  
  // Validação básica
  if (!email || !password) {
    return res.status(400).json({error: 'Email e senha são obrigatórios'});
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({error: 'Email inválido'});
  }
  
  try {
    const db = readDB();
    const user = (db.users||[]).find(u=>u.email===email);
    
    // Não encontrou usuário
    if(!user) {
      return res.status(401).json({error:'Email ou senha incorretos'});
    }
    
    // Verifica senha com bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch) {
      return res.status(401).json({error:'Email ou senha incorretos'});
    }
    
    // Gera token único e seguro
    const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    // Prepara dados do usuário para retorno (NUNCA retorna a senha!)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user'
    };

    // Salva sessão no banco de dados
    if (!db.sessions) db.sessions = [];
    
    // Limpa sessões antigas do mesmo usuário (opcional, para limitar sessões simultâneas)
    // db.sessions = db.sessions.filter(s => s.userId !== user.id);
    
    db.sessions.push({
      token,
      userId: user.id,
      user: userData,
      createdAt: Date.now()
    });
    writeDB(db);

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    return res.status(500).json({error: 'Erro ao processar login'});
  }
});

// Rota para logout - remove token do servidor
app.post('/api/auth/logout', authenticateToken, (req,res)=>{
  try {
    const db = readDB();
    // Remove a sessão do token
    db.sessions = (db.sessions || []).filter(s => s.token !== req.token);
    writeDB(db);
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

// Rota para verificar se token é válido
app.get('/api/auth/verify', authenticateToken, (req,res)=>{
  res.json({ 
    valid: true, 
    user: req.user 
  });
});
app.use('/api', newsRoutes);

// Middleware global de tratamento de erros (deve vir por último)
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('Server rodando na porta', PORT)); 
