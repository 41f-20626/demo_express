const express = require("express");
const cors = require("cors");
const auth = require("basic-auth");
const bodyParser = require("body-parser");

const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const app = express();

const authBasic = (req, res, next) => {
    //console.log(req);
    let usager = auth(req);
    if(usager && usager.name == "biero" && usager.pass == "biero"){
        next();
    }
    else{
        res.status(401).send("401");
    }
}


app.use(cors());
app.use(bodyParser.json());

app.put("*", authBasic);
app.post("*", authBasic);
app.delete("*", authBasic);


app.get("/biere", (req,res, next)=>{
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

app.get("/biere/:id", (req,res, next)=>{
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
           res.json(resultat);
       });

   })
})

app.get("/biere/:id/commentaire", (req,res, next)=>{
    res.send("Des commentaires");
})


app.put("/biere", (req, res)=>{
    mongoClient.connect("mongodb://127.0.0.1:27017/", (err, db)=>{
        if(err) {
            res.send("erreur 1");
            throw err;
        }
        let database = db.db("db_biero");
        let collection = database.collection("mesbiere");
        let biere = req.body;
        biere.date_ajout = new Date().toString();
        biere.date_modif = "";
        biere.commentaires = [];
        
        //console.log(biere);
        collection.insertOne(biere);
    
        res.send("put biere");

    });
});

app.put("/biere/:id/commentaire", (req, res)=>{
   
     res.send("put d'un commentaire");
 
 });


app.post("/biere/:id", (req, res)=>{
    res.json(
        { id : req.params.id,
          operation : "modifier"
        });
})


app.delete("/biere/:id", (req, res)=>{
    res.json({id : req.params.id});
})

app.listen(8080, function(){
    console.log("Démarrer, j'écoute sur le port 8080");
})