require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

// Em produção, defina FRONTEND_ORIGIN com a URL exata do site (ex: https://seusite.netlify.app)
// para restringir quem pode chamar a API. Sem essa variável, libera geral (útil em dev).
const allowedOrigin = process.env.FRONTEND_ORIGIN;
app.use(
  cors({
    origin: allowedOrigin ? allowedOrigin.split(',').map((s) => s.trim()) : true,
  })
);

app.use(express.json({ limit: '10mb' })); // 10mb por causa do logotipo em base64

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'ajofer-dashboard-backend', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 padrão para rotas de API não encontradas
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => {
  console.log(`Ajofer Dashboard backend rodando na porta ${PORT}`);
});
