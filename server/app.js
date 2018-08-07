const fs = require("fs");
const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const utils = require('./utils/utils');
const { folderName } = utils;


const app = express();

const upload = multer({
    dest: `uploads/${folderName}`
});

app.post('/images', upload.array('images', 9), function(req, res, next) {

	fs.mkdir(`uploads/${folderName}`, (err) => {
		for(const uploadImages of req.files) {
			fs.rename(uploadImages.path, `uploads/${folderName}/` + uploadImages.originalname, function(err) {
	            if (err) {
	                throw err;
	            }
	            console.log(uploadImages.originalname);
	        })
		}
	});
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(req.files) + JSON.stringify(req.body));
});




app.use(express.static('files'));

app.listen('3000');
console.log('server is running at localhost:3000');
