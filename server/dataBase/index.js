const mysql = require('mysql');
/**
 * 数据库信息
 * port默认为3306可以不填
 */
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'shangwei'
});

connection.connect();
console.log('数据库连接成功');

module.exports = connection;
