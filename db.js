const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('ERRO: variável de ambiente DATABASE_URL não definida. Veja o README.md.');
  process.exit(1);
}

// Neon/Render/Supabase geralmente exigem SSL. Em banco local (sem SSL) isso é ignorado.
const useSSL = process.env.DATABASE_SSL !== 'false';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do Postgres:', err);
});

module.exports = { pool };
