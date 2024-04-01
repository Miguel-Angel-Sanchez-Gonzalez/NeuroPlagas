const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1492',
  database: 'proyect_jwt' 
});

module.exports = connection;