var express = require('express');

var app = express();

app.get('/',function(req,res){
    console.log('Received request from', req.ip);
    res.send('Hello World !');
});

var server = app.listen(3000, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s',host,port);
});

app.get('/beers',function(req, res){
    console.log('Received request for beers from', req.ip);
    res.send('Hello beers !');
});

app.get('/beers/:beerId', function(req, res){
    console.log('Recieived request from'+req.params['beerId']+' from', req.ip);
    res.send('Hello beer '+req.parms['beerId']);
});