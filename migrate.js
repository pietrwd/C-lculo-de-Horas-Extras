// Aplica o schema.sql no banco configurado em DATABASE_URL.
// Uso: npm run migrate
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function migrate() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const client = await pool.connect();
  try {
    console.log('Aplicando schema.sql...');
    await client.query(sql);
    console.log('Schema aplicado com sucesso.');

    // Garante que exista a linha default de dashboard_data
    const { rows } = await client.query(
      `SELECT 1 FROM dashboard_data WHERE workspace_id = 'default'`
    );
    if (rows.length === 0) {
      await client.query(
        `INSERT INTO dashboard_data (workspace_id, state, logo) VALUES ('default', '{}'::jsonb, NULL)`
      );
      console.log('Linha inicial de dashboard_data criada.');
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Falha ao migrar:', err);
  process.exit(1);
});
