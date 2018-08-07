const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

express.use(bodyParser.urlencoded({ extended: false }));

/*
	获取订单信息
*/
router.get('/info', (req, res) => {
	console.log(req);
});


/*
	获取图片信息
*/
router.post('./images', (req, res) => {

});

module.export = router;
