# Anavrim - Casa de Massagem

Projeto separado em **Backend (API)** e **Frontend (Site)** para melhor deploy no Railway.

## 📁 Estrutura

```
Anavrin/
├── backend/          # API REST (Railway)
│   ├── server.js     # Servidor Express
│   ├── package.json  # Dependências
│   ├── data/         # Dados das terapeutas
│   ├── assets/       # Imagens e ícones
│   └── README.md     # Documentação do backend
└── frontend/         # Site estático (Netlify/Vercel)
    ├── index.html    # Site principal
    ├── admin.html    # Painel administrativo
    ├── style.css     # Estilos
    ├── scripts.js    # JavaScript
    └── README.md     # Documentação do frontend
```

## 🚀 Como usar

### Backend (API)
```bash
cd backend
npm install
npm start
```
**URL:** http://localhost:3000

### Frontend (Site)
```bash
cd frontend
# Abra index.html no navegador
# Ou use: npx serve .
```
**URL:** http://localhost:5000 (se usar serve)

## 🔧 Deploy

### Backend no Railway
1. Vá para pasta `backend/`
2. Conecte ao Railway
3. Deploy automático

### Frontend no Netlify/Vercel
1. Vá para pasta `frontend/`
2. Mude a URL da API no `index.html` (linha 108)
3. Deploy no Netlify ou Vercel

## 📝 Configuração para Produção

No `frontend/index.html`, linha 108:
```javascript
const API_URL = 'https://seu-backend.railway.app/api';
```

## 🔑 Acesso Admin

- **URL:** `frontend/admin.html`
- **Senha:** `admin123`

## ✅ Status

- ✅ Backend funcionando
- ✅ Frontend organizado
- ✅ Arquivos duplicados removidos
- ✅ Dependências instaladas 