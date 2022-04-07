// https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html#connect

const express = require("express");
const mongoClient = require("mongodb").MongoClient;

const app = express();



app.get("/biere", (req, res )=>{
    console.log("Route : /biere");
    //let test = {id: 123}
    //res.send(test);

    mongoClient.connect("mongodb://localhost:27017/", (err, db)=>{
        if(err) {
            res.send("erreur 1");
            throw err;
        }
        let database = db.db("db_biero");
        let collection = database.collection("mesbiere");
        collection.find().toArray((err, resultat)=>{
            if(err){
                res.send("erreur 2");
                throw err;
            }
            res.send(resultat);
        });

    })

})



app.listen(8080, () =>{
    console.log("Je suis démarré sur le port 8080");

})