var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

var port = 8888;

server.listen(port, function(){
    console.log('Server is live at:  http://localhost:' + port);
});

