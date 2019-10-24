/**
 * 登录
 * 先验证登录信息是否正确
 * 然后用户发送过来的信息去微信服务器换取用户的openID
 */
const https = require('https');
const express = require('express');
const router = express.Router();

const appid = require('../common/appId'); //小程序标识
const wxApi = require('../common/wxApi'); //微信相关api
const secret = require('../common/secret'); //小程序secret

const connection = require('../dataBase');

router.post('', (req, res) => {
    const {
        code,
        userName,
        password,
		identity
    } = req.body;

    if (code && password === 'shangwei123') {
        const params = {
            appid,
            secret,
            js_code: code,
            grant_type: 'authorization_code'
        }

        const options = {
            hostname: wxApi.hostname,
            path: `${wxApi.path}?appid=${params.appid}&secret=${params.secret}&js_code=${params.js_code}&grant_type=${params.grant_type}`,
            method: 'GET'
        }

		const wxRequest = https.request(options, (response) => {
            response.on('data', (d) => {
                const data = JSON.parse(d.toString());

				connection.query(`INSERT INTO usertable (openID,identity,username) VALUES ('${data.openid}','${identity}','${userName}')`, (err, database) => {
					const state = err ? 0 : 1;
					res.json({
						code: 0,
						openid: data.openid,
						state
					});
					res.end();
				});
            });
        });

        wxRequest.on('error', (e) => {
            console.error(e);
        });
		wxRequest.end();
    } else {
        res.json({
            code: 1
        });
    }
});

module.exports = router;
