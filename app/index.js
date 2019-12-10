var express = require('express');

var app = express();

var beersList = require('./beers/beers.json');
console.log("Beers",beersList);

app.get('/',function(req,res){
    console.log('Received request from', req.ip);
    res.send('Hello World !');
});

var server = app.listen(3000, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s',host,port);
});

//////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

app.get('/beers',function(req, res){
    console.log('Received request for beers from', req.ip);
    res.json(beersList);
});

app.get('/beers/:beerId', function(req, res){
    console.log('Recieived request from '+req.params['beerId']+' from', req.ip);
    var beerDetails = require('./beers/'+req.params['beerId']+'.json')
    res.json(beerDetails);
});


app.use('/img',express.static('img'));
app.use(express.static('public'))
