//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use = bodyParser(urlencoded({ extended:true }));








app.listen(3000, () => {
    console.log('server is running on port 3000');
});