const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const utils = require('../utils/utils');
const connection = require('../dataBase');
const { folderName } = utils;

fs.mkdir(`uploads/${folderName}`, (err) => {
	if(!err) {
		console.log(`当前时间${folderName},当日文件夹创建成功`);
	}
});

const upload = multer({
    dest: `uploads/${folderName}`
});

/**
 * 上传订单信息
 */
router.get('/info', (req, res, next) => {
	let [keys, values] = ['', ''];
	for (const key in req.query) {
		keys += `${key},`;
		values += `'${req.query[key]}',`;
	}
	keys = keys.substring(0, keys.length - 1);
	values = values.substring(0, values.length - 1);
	connection.query(`INSERT INTO ordertable (${keys}) VALUES (${values})`, (err, database, fields) => {
		if(err) {
			console.log(err);
		} else {
			res.json({
				code: 0,
				info: database
			});
			res.end();
		}
	});
});

/**
 * 上传图片
 */
router.post('/images', upload.array('images', 9), (req, res, next) => {
	const insertId = parseInt(req.body.insertId);
	for(const uploadImages of req.files) {
		fs.rename(uploadImages.path, `uploads/${folderName}/` + uploadImages.originalname, (err) => {
            if (err) {
                throw err;
            }
			const path = `${uploadImages.originalname}`;	// 图片路径
			connection.query(`INSERT INTO imagetable (url,id) VALUES ('${path}',${insertId})`, (err) => {
				if(err) {
					res.json({
						code: 1
					});
				} else {
					res.json({
						code: 0
					});
				}
				res.end();
			});
        })
	}
});

router.get('/search', (req, res, next) => {
	
});

module.exports = router;
