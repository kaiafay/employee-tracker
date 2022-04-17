// import dependencies and files
const inquirer = require('inquirer');
const db = require('./db');
require('console.table');


// function that holds prompts
const mainPrompts = () => {
    console.log("Welcome to Employee Tracker!");
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        .then(res => {
            let choice = res.choice;
            // call function depending on user choice
            switch (choice) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                default:
                    quit();
            }
        })
};

// function for view all departments

// function for view all roles

// function for view all employees

// function for add a department

// function for add a role

// function for add an employee

// function for update an employee role

// function that quits application
const quit = () => {
    console.log('Goodbye!');
    process.exit();
};