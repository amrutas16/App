var redis = require('redis');
var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer');
var redisIp = fs.readFileSync('redisServer.txt', 'utf-8');
// var redisIp = '159.203.141.25';
var client = redis.createClient(6379, redisIp, {})
var count = 0;
client.set("feature", "on");

app.get('/', function(req, res){
  res.send('Hello world!');
});

app.get('/set', function(req, res){
	client.get("feature", function(err, value){
		if(value == "on"){
			res.send('Key set!');			
		}
		else{
			res.send('Not allowed to set key');
		}
	});
});

app.get('/get', function(req, res){
	count = count + 1;
	if(count == 3)
	{
		res.send("Get")
		client.set("alert", true);
	}
	else
	{
		client.set("alert", false);
		res.send("Alert!");
	}
});

if(true){
	console.log("True");
}

// app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
//    // console.log(req.body) // form fields
//    // console.log(req.files) // form files

//    if( req.files.image )
//    {
// 	   fs.readFile( req.files.image.path, function (err, data) {
// 	  		if (err) throw err;
// 	  		var img = new Buffer(data).toString('base64');
// 	  		// console.log(img);
// 	  		client.lpush("imglist", img, function(err, value){
// 	  		})
// 		});
// 	}

//    res.status(204).end()
// }]);

// app.get('/meow', function(req, res) {
// 	{
// 		client.lpop("imglist", function(err,imagedata){
// 			// console.log(imagedata.length);
// 			client.set("imgLength", imagedata.length);
// 			res.writeHead(200, {'content-type':'text/html'});
// 			res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
// 			res.end();
// 		});
// 	}
// })

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
