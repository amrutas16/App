var express = require('express');
var app = express();
var fs = require('fs');

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

app.post('/data', function(req,res){
	console.log(req.body.cpu);
	console.log(req.body.mem);
	res.send('Gotcha');
})

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
