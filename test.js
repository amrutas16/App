var redis = require('redis');
var express = require('express');
var app = express();
var fs = require('fs');
var client = redis.createClient(6379, '127.0.0.1', {})

var bodyParser = require('body-parser');
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 

app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res){
  res.send('Hello world!');
});

app.get('/set', function(req,res){
	// console.log(req.body.cpu);
	// console.log(req.body.mem);
	res.send('Setting alert');
	client.set("alert", 1);
})

var server = app.listen(3002, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
