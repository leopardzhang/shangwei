const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'shangwei'
});

connection.connect();
console.log('数据库连接成功');

module.exports = connection;
