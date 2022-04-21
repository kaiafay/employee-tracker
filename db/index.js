// import connection to database
const connection = require('./connection');

// class that holds all methods
class DB {
    // references the connection 
    constructor(connection) {
        this.connection = connection;
    };

    // find all departments method
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name AS department FROM department;");
    };

    // find all roles method
    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department_id;");
    };


    // find all employees method
    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    };

    // add department method
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    };

    // add role method
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    };

    // add employee method
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    };

    // update employee role method
    updateEmployee(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    };
};

module.exports = new DB(connection);