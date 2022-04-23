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
                    'Delete a department',
                    'Add a role',
                    'Delete a role',
                    'Add an employee',
                    'Delete an employee',
                    "Update an employee's role",
                    "Update an employee's manager",
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
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    updateEmployeeManager();
                    break;
                default:
                    quit();
            }
        });
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
            type: 'input',
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

// function for delete a department
const deleteDepartment = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentNames = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department would you like to remove?',
                    choices: departmentNames
                }
            ])
            .then(res => db.deleteDepartment(res.department))
            .then(() => console.log('Removed department from the database successfully!'))
            .then(() => mainPrompts());
    });
};

// function for add a role
const addRole = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;

            // map through departments and turn them into an array
            const departmentNames = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            // prompt user for role information
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
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

// function for delete a role
const deleteRole = () => {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleNames = roles.map(({ id, job_title }) => ({
                name: job_title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role would you like to remove?',
                    choices: roleNames
                }
            ])
            .then(res => db.deleteRole(res.role))
            .then(() => console.log('Removed role from the database successfully!'))
            .then(() => mainPrompts());
    });  
};

// function for add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleNames = roles.map(({ id, job_title }) => ({
                    name: job_title,
                    value: id
                }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roleNames
                    }
                ])
                .then(res => {
                    let role = res.role;

                    db.findAllEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerNames = employees.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            // add 'none' to manager choices
                            managerNames.unshift({ name: 'None', value: null });

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is the employee's manager?",
                                    choices: managerNames
                                }
                            ])
                            .then(res => {
                                let employee = {
                                    manager_id: res.manager,
                                    role_id: role,
                                    first_name: firstName,
                                    last_name: lastName
                                }

                                db.addEmployee(employee)
                                .then(() => console.log(`Added ${firstName} ${lastName} to the database successfully!`))
                                .then(() => mainPrompts());
                            });
                        });
                });
            });
    });
};

// function for delete an employee
const deleteEmployee = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeNames = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee would you like to remove?",
                    choices: employeeNames
                }
            ])
            .then(res => db.deleteEmployee(res.employee))
            .then(() => console.log('Removed employee from the database successfully!'))
            .then(() => mainPrompts());
    });
};

// function for update an employee role
const updateEmployeeRole = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeNames = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role do you want to update?",
                    choices: employeeNames
                }
            ])
            .then(res => {
                let employee = res.employee
                db.findAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleNames = roles.map(({ id, job_title }) => ({
                            name: job_title,
                            value: id
                        }));

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: "Which role do you want to assign to the selected employee?",
                                choices: roleNames
                            }
                        ])
                        .then(res => db.updateEmployeeRole(employee, res.role))
                        .then(() => console.log("Updated employee's role successfully!"))
                        .then(() => mainPrompts());
                    });
            });
        });
};

// function for update an employee manager
const updateEmployeeManager = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeNames = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's manager do you want to update?",
                    choices: employeeNames
                }
            ])
            .then(res => {
                let employee = res.employee
                db.findAllManagers(employee)
                    .then(([rows]) => {
                        let managers = rows;
                        const managerNames = managers.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Which manager do you want to assign to the selected employee?",
                                choices: managerNames
                            }
                        ])
                        .then(res => db.updateEmployeeManager(employee, res.manager))
                        .then(() => console.log("Updated employee's manager successfully!"))
                        .then(() => mainPrompts());
                    });
            });
        });

};


// function that quits application
const quit = () => {
    console.log('Goodbye!');
    process.exit();
};

mainPrompts();