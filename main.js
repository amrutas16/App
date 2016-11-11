var redis = require('redis');
var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer');
var redisIp = fs.readFileSync('redisServer.txt', 'utf-8');
var client = redis.createClient(6379, redisIp, {})
// var client = redis.createClient(6379, '127.0.0.1', {})
var count = 0;

app.get('/', function(req, res){
  res.send('Hello!');
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

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
   // console.log(req.body) // form fields
   // console.log(req.files) // form files
	
   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) {throw err};
	  		var img = new Buffer(data).toString('base64');
	  // 		if(img.length > 50000)
			// 	client.set("alert",true); // form fields
			// else
			// 	client.set("alert",false);
	  		client.lpush("imglist", img, function(err, value){
	  		})
		});
	}

   res.status(204).end()
}]);

app.get('/meow', function(req, res) {
	{
		client.lpop("imglist", function(err,imagedata){
			// if(imagedata.length > 50000)
			// {
			// 	client.set("alert",true);
			// 	res.send("Image too large to display. Route to production here onwards...");
			// }
			// else
			// {
				res.writeHead(200, {'content-type':'text/html'});
				res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
				res.end();	
			// }
			
		});
	}
})

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
