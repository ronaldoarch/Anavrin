const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const DATA_FILE = path.join(__dirname, 'data', 'meninas.json');
const ASSETS_DIR = path.join(__dirname, 'assets');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ASSETS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Helper para ler e salvar o JSON das meninas
function getMeninas() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function saveMeninas(meninas) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(meninas, null, 2));
}

// Rota para listar meninas (ordenadas por nome)
app.get('/api/meninas', (req, res) => {
  const meninas = getMeninas();
  meninas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  res.json(meninas);
});

// Rota para upload/troca de foto (agora por id, com extensão correta)
app.post('/api/meninas/:id/foto', upload.single('foto'), (req, res) => {
  const id = req.params.id;
  const meninas = getMeninas();
  const menina = meninas.find(m => m.id === id);
  if (!menina) return res.status(404).json({ error: 'Menina não encontrada' });

  // Detectar extensão do arquivo enviado
  const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
  // Usar o nome atual da menina para o arquivo
  const fileName = `${menina.nome}${ext}`;
  const destPath = path.join(ASSETS_DIR, fileName);

  // Remover arquivo antigo se existir e for diferente
  if (menina.foto && menina.foto !== `/assets/${fileName}`) {
    const oldPath = path.join(ASSETS_DIR, path.basename(menina.foto));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  fs.renameSync(req.file.path, destPath);
  menina.foto = `/assets/${fileName}`;
  saveMeninas(meninas);
  res.json(menina);
});

// Rota para editar nome e descrição de uma menina (agora por id, renomeando foto se necessário)
app.put('/api/meninas/:id', (req, res) => {
  const id = req.params.id;
  const { novoNome, descricao } = req.body;
  const meninas = getMeninas();
  const menina = meninas.find(m => m.id === id);
  if (!menina) return res.status(404).json({ error: 'Menina não encontrada' });

  // Se o nome mudou, renomear o arquivo da foto
  if (novoNome && novoNome !== menina.nome && menina.foto) {
    const ext = path.extname(menina.foto);
    const oldPath = path.join(ASSETS_DIR, path.basename(menina.foto));
    const newFileName = `${novoNome}${ext}`;
    const newPath = path.join(ASSETS_DIR, newFileName);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      menina.foto = `/assets/${newFileName}`;
    }
    menina.nome = novoNome;
  } else if (novoNome) {
    menina.nome = novoNome;
  }
  if (descricao !== undefined) menina.descricao = descricao;
  saveMeninas(meninas);
  res.json(menina);
});

// Rota para upload/troca do banner do site
const BANNER_FILE = path.join(ASSETS_DIR, 'banner-moema.jpg');
app.post('/api/banner', upload.single('banner'), (req, res) => {
  // Salva o banner sempre com o mesmo nome
  fs.renameSync(req.file.path, BANNER_FILE);
  res.json({ banner: '/assets/banner-moema.jpg' });
});

// Rota para login simples (senha fixa)
app.post('/api/login', (req, res) => {
  const { senha } = req.body;
  if (senha === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Senha incorreta' });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 