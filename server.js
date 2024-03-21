const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3002;
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
  .then(client => {
    console.log('Connected to PostgreSQL database');
    
    // Perform database operations 
    client.query('SELECT * FROM departments')
      .then(result => {
        console.log(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
      })
    
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

pool.on('error', err => {
  console.error('PostgreSQL pool error:', err);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// questions to prompt the user
inquirer
    .prompt([
        {
            type: 'list',
            name: 'table',
            message: 'Which table would you like to view?',
            choices: ['departments', 'roles', 'employees']
        },
        {
            type: 'list',
            name: 'additions',
            message: 'Would you like to add a department, role or employee?',
            choices: ['add department', 'add roles', 'add employee']
        }
    ])

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
