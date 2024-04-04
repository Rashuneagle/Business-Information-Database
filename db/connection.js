const { Pool } = require('pg');

// Create a new PostgreSQL pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'password',
    port: 5432,
  });

  module.exports = pool;