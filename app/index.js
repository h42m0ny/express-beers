var express = require('express');
var app = express();
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = `${process.env.MONGODB_ADDON_URI}`;

MongoClient.connect(url,function(err,client){
    console.log("Connected correctly to MongoDB server.");
    client.close();
});

app.use(cors());

var server = app.listen(process.env.PORT, function (){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s',host,port);
});

//////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

app.get('/beers',async function(req, res){
    console.log('Received request for beers from', req.ip);
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(process.env.MONGODB_ADDON_DB);
        var beerList = await db.collection('beers').find().toArray();
        res.json(beerList);
    } catch (err){
        console.log(err.stack);
    }
    client.close();
    res.json(beersList);
});

app.get('/beers/:beerId', async function(req, res){
    console.log('Recieived request from '+req.params['beerId']+' from', req.ip);
    let client;
    try{
        client =  await MongoClient.connect(url);
        const db = client.db(process.env.MONGODB_ADDON_DB);
        let beerId = req.params.beerId;
        var beer = await db.collection('beers').find({id: beerId}).toArray();
        console.log(beer[0]);
        res.json(beer[0]);
    } catch(err) {
        console.log(err.stack);
    }
    client.close();
});

app.use('./app/img',express.static('img'));
// app.use('./app/beers/img',express.static('img'));
// app.use('.app/img/beers/img',express.static('img'));
// app.use('./app/img/beers/img',express.static('./img'));
app.use(express.static('./app/public/'));
