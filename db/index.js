const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_db',
  password: 'password',
  port: 5432,
});

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findAllDepartments() {
    return this.query('SELECT * FROM departments');
  }

  async findAllRoles() {
    return this.query('SELECT * FROM roles');
  }

  async findAllEmployees() {
    return this.query(`
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, managers.first_name || ' ' || managers.last_name AS manager
      FROM employees
      JOIN roles ON employees.role_id = roles.id
      JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `);
  }

  async createDepartment(department) {
    const { name } = department;
    await this.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  }

  async createRole(role) {
    const { title, salary, department_id } = role;
    await this.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  }

  async createEmployee(employee) {
    const { first_name, last_name, role_id, manager_id } = employee;
    await this.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  }

  async updateEmployee(employee) {
    const { role_id, id } = employee;
    await this.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, id]);
  }
}

module.exports = new DB();
