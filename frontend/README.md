# Anavrim Frontend

Site da Anavrim - Casa de Massagem em São Paulo.

## 🚀 Como usar

1. Abra `index.html` no navegador
2. Ou use um servidor local:
   ```bash
   npx serve .
   ```

## 🔧 Configuração da API

No arquivo `index.html`, linha 108, mude:
```javascript
const API_URL = 'http://localhost:3000/api'; // Desenvolvimento
const API_URL = 'https://seu-backend.railway.app/api'; // Produção
```

## 📁 Estrutura

- `index.html` - Site principal
- `admin.html` - Painel administrativo
- `style.css` - Estilos
- `scripts.js` - JavaScript
- `assets/` - Imagens e ícones

## 🚀 Deploy

Pode ser hospedado em qualquer serviço estático:
- Netlify
- Vercel
- GitHub Pages
- Railway (static) 