const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const utils = require('../utils/utils');
const { folderName } = utils;

fs.mkdir(`uploads/${folderName}`, (err) => {
	if(!err) {
		console.log(`当前时间${folderName},当日文件夹创建成功`);
	}
});

const upload = multer({
    dest: `uploads/${folderName}`
});

/*
	获取订单信息
*/
router.post('/images', upload.array('images', 9), function(req, res, next) {
	console.log(req.body);
	for(const uploadImages of req.files) {
		fs.rename(uploadImages.path, `uploads/${folderName}/` + uploadImages.originalname, function(err) {
            if (err) {
                throw err;
            }
            console.log(uploadImages.originalname);
			/* 图片路径 */
			const path = `uploads/${folderName}${uploadImages.originalname}/`
        })
	}
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(req.files) + JSON.stringify(req.body));
});

module.exports = router;
