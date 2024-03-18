const express = require('express');


const { pool } = require('pg');

// Create a new PostgreSQL pool instance
const pool = new pool({
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

