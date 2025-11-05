# ⚽ Passa a Bola - Plataforma de Futebol Feminino

Uma plataforma completa para acompanhar futebol feminino, com tabelas, jogos, notícias e sistema de Fantasy.

> **📚 Este projeto faz parte do Challenge da FIAP para a empresa Passa a Bola**

## 🎯 Sobre o Projeto

**Passa a Bola** é uma plataforma web moderna desenvolvida para acompanhar o futebol feminino brasileiro e internacional. O projeto foi desenvolvido como parte do Challenge da FIAP em parceria com a empresa Passa a Bola. O projeto inclui:

- 📊 **Tabelas de Classificação** - Acompanhe a posição dos times
- 🎮 **Jogos ao Vivo** - Visualize partidas e resultados
- 📰 **Notícias** - Scraping automático do Globo Esporte
- 🏆 **Fantasy League** - Sistema de apostas e rankings
- 🔐 **Autenticação** - Sistema completo com tokens e validação

## 🚀 Tecnologias

### Frontend
- **React 18.2** - Biblioteca JavaScript
- **Vite 5.4** - Build tool e dev server
- **React Router 6.14** - Roteamento
- **Tailwind CSS 3.4** - Estilização
- **Recharts 2.15** - Gráficos e visualizações
- **Context API** - Gerenciamento de estado

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express 5.1** - Framework web para Node.js
- **Puppeteer 24.21** - Web scraping
- **JSON File System** - Banco de dados (simples para desenvolvimento)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/matbarroso97/passa-a-bola-project.git
cd passa-a-bola-project
```

### 2. Instale as dependências

```bash
npm run install:all
```

Este comando instala as dependências do projeto raiz (backend) e do frontend.

### 3. Configure o banco de dados

```bash
npm run seed
```

Isso cria o arquivo `server/db/db.json` com dados iniciais.

### 4. Inicie o projeto

```bash
npm run dev
```

Isso inicia:
- **Backend** na porta `3001`
- **Frontend** na porta `5173`

Acesse: http://localhost:5173

## 🔑 Credenciais de Teste

### Administrador
- **Email:** `admin@passabola.com`
- **Senha:** `123456`

### Usuário
- **Email:** `user@passabola.com`
- **Senha:** `123456`

## 📁 Estrutura do Projeto

```
passa-a-bola-project/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── auth/         # Componentes de autenticação
│   │   │   ├── fantasy/      # Componentes Fantasy
│   │   │   ├── games/        # Componentes de jogos
│   │   │   ├── modals/       # Modais
│   │   │   ├── news/         # Componentes de notícias
│   │   │   ├── sidebar/      # Componentes da sidebar
│   │   │   └── ui/           # Componentes UI genéricos
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── contexts/         # Contextos React (Auth, News)
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # Serviços de API
│   │   ├── config/           # Configurações
│   │   └── lib/              # Utilitários
│   ├── public/              # Arquivos estáticos (assets, ícones)
│   └── package.json
│
├── server/                  # API Backend
│   ├── db/                  # Banco de dados JSON
│   │   ├── db.json          # Dados (usuários, jogos, times, ranking)
│   │   └── seed.js           # Script de inicialização
│   ├── routes/              # Rotas da API
│   │   └── news.js           # Rota de scraping de notícias
│   ├── index.js             # Servidor Express
│   └── package.json
│
└── package.json             # Scripts do projeto raiz
```

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verificar token

### Dados
- `GET /api/games` - Lista de jogos
- `GET /api/teams` - Lista de times
- `GET /api/ranking` - Tabela de classificação
- `GET /api/news/feminine-football` - Notícias (scraping)

## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
# Instalar todas as dependências
npm run install:all

# Rodar em desenvolvimento (frontend + backend)
npm run dev

# Rodar apenas backend
npm run server

# Rodar apenas frontend
npm run client

# Gerar dados iniciais
npm run seed
```

### Build para Produção

```bash
cd frontend
npm run build
```

## 🔒 Autenticação

O sistema implementa autenticação completa:

- ✅ Validação de credenciais no servidor
- ✅ Geração de tokens únicos
- ✅ Validação de token em cada requisição
- ✅ Expiração automática (24 horas)
- ✅ Logout com remoção de sessão

## 📊 Banco de Dados

O projeto usa **JSON File System** como banco de dados (`server/db/db.json`):

- ✅ Simples e rápido para desenvolvimento
- ✅ Não requer configuração
- ✅ Funciona perfeitamente para testes e demonstração

## 🐛 Troubleshooting

### Erro ao iniciar
- Verifique se Node.js 18+ está instalado
- Execute `npm run install:all` novamente

### Porta já em uso
- Altere a porta no `server/index.js` ou `vite.config.js`

### Scraping não funciona
- Verifique conexão com internet
- O sistema usa fallback automático se falhar
- Primeira execução pode demorar (baixa Chrome do Puppeteer)

## 👥 Desenvolvedores

Este projeto foi desenvolvido por:

- **Matheus da Costa Barroso**
- **Matheus Kitamura**
- **Victor Oliveira Alves**
- **João Guilherme Guida**


---

**Desenvolvido com ❤️ para o futebol feminino brasileiro**

