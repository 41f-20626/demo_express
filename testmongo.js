// https://www.mongodb.com/docs/manual/crud/
//https://www.mongodb.com/docs/drivers/node/current/

const express = require("express");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const app = express();


app.get("/ajouter", (req, res)=>{
    mongoClient.connect("mongodb://127.0.0.1:27017/", (err, db)=>{
        if(err) {
            res.send("erreur 1");
            throw err;
        }
        let database = db.db("db_biero");
        let collection = database.collection("mesbiere");
        let biere = {   
                        nom : "ma biere " + parseInt(Math.random()*10), 
                        brasserie : "ma brasserie",
                        commentaires : [
                            {courriel : "allo@allo",
                             commentaire : "lorem ipsum"
                        }
                        ]
                    };
        collection.insertOne(biere);

        res.send("biere ajouté : " + JSON.stringify(biere));

    })

})



app.get("/biere", (req, res )=>{
    console.log("Route : /biere");
    //let test = {id: 123}
    //res.send(test);

    mongoClient.connect("mongodb://127.0.0.1:27017/", (err, db)=>{
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


app.get("/biere/:id", (req, res )=>{
    //let id = req.params.id;
    console.log(req.params.id);
    mongoClient.connect("mongodb://127.0.0.1:27017/", (err, db)=>{
        if(err) {
            res.send("erreur 1");
            throw err;
        }
        let database = db.db("db_biero");
        let collection = database.collection("mesbiere");
        collection.find({_id: new mongo.ObjectId(req.params.id)}).toArray((err, resultat)=>{
        
            if(err){
                res.send("erreur 2");
                throw err;
            }
            res.send(resultat);
        });

    })

})


app.get("/biere/:id/effacer", (req, res )=>{
   
    console.log(req.params.id);
    mongoClient.connect("mongodb://127.0.0.1:27017/", (err, db)=>{
        if(err) {
            res.send("erreur 1");
            throw err;
        }
        let database = db.db("db_biero");
        let collection = database.collection("mesbiere");
        collection.deleteOne({_id: new mongo.ObjectId(req.params.id)}, (err, resultat)=>{
            if(err) {
                res.send("erreur delete");
                throw err;
            }
            res.send("ok");
        });

    })

})

app.listen(8080, () =>{
    console.log("Je suis démarré sur le port 8080");

})