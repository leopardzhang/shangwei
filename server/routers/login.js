const https = require('https');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const appid = require('../common/appId');
const wxApi = require('../common/wxApi');
const secret = require('../common/secret');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'shangwei'
});

connection.connect();

router.post('', (req, res) => {
	const {
		code,
		userName,
		password
	} = req.body;

	if(code) {
		const params = {
			appid,
			secret,
			js_code: code,
			grant_type: 'authorization_code'
		}
		connection.query(`SELECT * FROM usertable WHERE username='${userName}' and password='${password}'`, (err, database, fields) => {
			if(err) {
				res.json({
					code: -2
				});
			} else if (database.length) {
				const options = {
					hostname: wxApi.hostname,
					path: `${wxApi.path}?appid=${params.appid}&secret=${params.secret}&js_code=${params.js_code}&grant_type=${params.grant_type}`,
					method: 'GET'
				}
				const req = https.request(options, (response) => {
					response.on('data', (d) => {
						const data = JSON.parse(d.toString());

						res.json({
							code: 0,
							openid: data.openid
						});
					});
				});

				req.on('error', (e) => {
					console.error(e);
				});
				req.end();
			} else {
				res.json({
					code: 1
				});
			}
		});
	}
});

module.exports = router;
