var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dev',
    password : 'dev',
    database : 'bookstore'
});

try {
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}

module.exports = connection;