const express = require('express');



const { Pool } = require('pg');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new PostgreSQL pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_db',
  password: 'password',
  port: 5432,
});

// Connect to the database
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    // Perform database operations here
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

pool.on('error', err => {
  console.error('PostgreSQL pool error:', err);
});

// Query database
pool.query('SELECT * FROM company_db', function (err, {rows}) {
    console.log(rows);
  });
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

