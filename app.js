var d3= require('d3')
var express = require('express');
var fs = require('fs');
var app = express();
const path = require('path');

app.use('/public', express.static('public'))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(8080);
console.log('Express server started');