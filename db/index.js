// import connection to database
const connection = require('./connection');

// class that holds all methods
class DB {
    // references the connection 
    constructor(connection) {
        this.connection = connection;
    }

    // find all departments method
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name AS department FROM department;");
    };

    // find all roles method
    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department_id;");
    };


    // find all employees method

    // add department method

    // add role method

    // add employee method

    // update employee role method
};