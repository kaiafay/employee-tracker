const mysql = require('mysql2');

// connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'codenow18',
    database: 'employees'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;