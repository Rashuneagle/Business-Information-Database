const inquirer = require('inquirer');
const db = require('./db/index');

async function startApp() {
  try {
    console.log('Welcome to the Employee Management System!');

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    switch (action) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting the application.');
        process.exit();
      default:
        console.log('Invalid choice.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function viewAllDepartments() {
  const departments = await db.findAllDepartments();
  console.table(departments);
  startApp();
}

async function viewAllRoles() {
  const roles = await db.findAllRoles();
  console.table(roles);
  startApp();
}

async function viewAllEmployees() {
  const employees = await db.findAllEmployees();
  console.table(employees);
  startApp();
}

async function addDepartment() {
  const { departmentName } = await inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:'
  });
  await db.createDepartment({ name: departmentName });
  console.log('Department added successfully.');
  startApp();
}

async function addRole() {
  const { roleName, roleSalary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter the name of the role:'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter the Salary for the role:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the role:'
    }
  ]);
  await db.createRole({ title: roleName, salary: roleSalary, department_id: departmentId });
  console.log('Role added successfully.');
  startApp();
}

async function addEmployee() {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role id of the employee:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager id of the employee:'
    }
  ]);
  await db.createEmployee({ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
  console.log('Employee added successfully.');
  startApp();
}

async function updateEmployeeRole() {
const { employeeId, roleId } = await inquirer.prompt([
  {
    type: 'input',
    name: 'employeeId',
    message: 'Enter the ID of the employee:'
  },
  {
    type: 'input',
    name: 'roleId',
    message: 'Enter the employees new role ID:'
  }
]);
await db.updateEmployee({ role_id: roleId, id: employeeId});
console.log('Employee role updated sucessfully.');
startApp();
}

startApp();
