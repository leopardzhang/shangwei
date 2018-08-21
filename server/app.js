const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const order = require('./routers/order');
const login = require('./routers/login');

const app = express();

app.use(bodyParser.json());

/* order-router */
app.use('/order', order);
app.use('/login', login);

app.use(express.static('www'));
app.use(express.static('uploads'));

app.listen('3000');
console.log('server is running at localhost:3000');
