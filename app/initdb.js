
var MongoClient = require('mongodb').MongoClient;
var url = `${process.env.MONGODB_ADDON_URI}`;


async function init() {
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(process.env.MONGODB_ADDON_DB);
        var empty = await db.collection('beers').drop(); 

        let beerList = [  
            'AffligemBlond',
            'AffligemDubbel',
            'AffligemTripel',
            'ChimayRouge',
            'ChimayTriple',
            'StBernardusAbt12',
            'StBernardusTripel',
            'StBernardusPater6',
            'RinceCochon',
            'TrappistesRochefort6',
            'TrappistesRochefort8',
            'TrappistesRochefort10',
        ]

        beerList.forEach( async (beerName) =>  {
            let beer = require(`./beers/${beerName}.json`);
            let beerInDb = await db.collection('beers').insertOne(beer);
        });           

    } catch (err){
        console.log(err.stack);
    }
    client.close();
}

init();
