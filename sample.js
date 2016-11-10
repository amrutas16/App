var redis = require('redis');
var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
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

// setInterval(function(){
	app.get('/monitor', function(req,res){
	// console.log(req.body.cpu);
	// console.log(req.body.mem);
	res.send('Monitoring');
	client.get("alert", function(err, value){
		if(value == 1)
		{
			console.log("Alert!");
		}
		else
		{
			console.log("No alert");
		}
	})
})
// }, 2000);

var options = {
  host: 'localhost',
  port: 3001,
  path: '/monitor',
  method: 'GET'
};

setInterval(function(){
// 	// var req = http.request(options, function(res) {
// 	//   console.log('STATUS: ' + res.statusCode);
// 	//   console.log('HEADERS: ' + JSON.stringify(res.headers));
// 	//   res.setEncoding('utf8');
// 	//   res.on('data', function (chunk) {
// 	//     console.log('BODY: ' + chunk);

// 	//   });
// });
client.get("alert", function(err, value){
		if(value == 1)
		{
			console.log("Alert!");
			// create new server
		}
		else
		{
			console.log("No alert");
		}
	})
}, 2000);

// app.post('/monitor', function(req,res){
// 	console.log("post");
// })

var server = app.listen(3001, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
