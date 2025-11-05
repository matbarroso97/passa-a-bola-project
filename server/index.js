const express = require('express');
const path = require('path');
const fs = require('fs');
const newsRoutes = require('./routes/news');
const app = express();
const DATA = path.join(__dirname,'db','db.json');
app.use(express.json());
app.use((req,res,next)=>{ res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'); next(); });
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
app.get('/api/games', (req,res)=>{ const db = readDB(); res.json(db.games||[]); });
app.get('/api/teams', (req,res)=>{ const db = readDB(); res.json(db.teams||[]); });
app.get('/api/ranking', (req,res)=>{ const db = readDB(); res.json(db.ranking||[]); });

app.post('/api/auth/login', (req,res)=>{
  const {email,password} = req.body;
  const db = readDB();
  const user = (db.users||[]).find(u=>u.email===email && u.password===password);
  if(!user) return res.status(401).json({error:'invalid credentials'});
  
  // Gera token único
  const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  
  // Prepara dados do usuário para retorno
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user'
  };

  // Salva sessão no banco de dados
  if (!db.sessions) db.sessions = [];
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('Server rodando na porta', PORT)); 
