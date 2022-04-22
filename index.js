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
const viewAllDepartments = () => {
    db.findAllDepartments()
        // parse the query for readability 
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => mainPrompts());
};

// function for view all roles
const viewAllRoles = () => {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
        // send user back to prompts
        .then(() => mainPrompts());
};

// function for view all employees
const viewAllEmployees = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => mainPrompts());
};

// function for add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then(res => {
        let name = res;
        db.addDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database successfully!`))
            .then(() => mainPrompts());
    });
};

// function for add a role
const addRole = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            // map through departments and turn them into an array
            const departmentNames = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            // prompt user for role information
            inquirer.prompt([
                {
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
                    // not displaying department names
                    choices: departmentNames
                }
            ])
            .then(role => {
                db.addRole(role)
                .then(() => console.log(`Added ${role.title} to the database successfully!`))
                .then(() => mainPrompts());
            });
        });
};

// function for add an employee
const addEmployee = () => {

};

// function for update an employee role
const updateEmployee = () => {

};

// function that quits application
const quit = () => {
    console.log('Goodbye!');
    process.exit();
};

mainPrompts();