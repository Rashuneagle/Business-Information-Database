const express = require('express');

const inquirer = require('inquirer');

const db = require('./db');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Function to perform database query based on user input
function performDepartmentQuery(tableName) {
  pool.query(`SELECT * FROM ${tableName}`)
    .then(result => {
      console.log(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
    });
}

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
    .then(answers => {
      // Trigger database query based on user input
      performDepartmentQuery(answers.table);
    });

    //.then((res)=>{
      let choice = res.choice;
      switch(choice){
        case 'VIEW_EMPLOYEES':
          viewEmployees();
          break;
      }
    }
    )

//functions to write: viewEmployees, viewEmployeesByDepartment, viewEmployeesByManager, removeEmployee, updateEmployeeRole, update employee manager, view Roles, add roles, remove roles, viewDepartments, addDepartment, removeDepartments, addEmployee, quit fundtion

    pool.on('error', err => {
  console.error('PostgreSQL pool error:', err);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
