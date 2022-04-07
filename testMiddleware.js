const express = require("express");
const cors = require("cors");
const auth = require("basic-auth");
const bodyParser = require("body-parser");


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
    res.send("Une biere, menoum");
})

app.put("/biere", (req, res)=>{
    let data = req.body;
    data.date_ajout = "";
    data.date_modif = "";
    data.commentaires = [];

    // inséré dans mongodb....
    console.log(req.body);


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

/*
app.post("/biere/:id", authBasic, (req, res)=>{
    res.json(
        { id : req.params.id,
          operation : "modifier"
        });
})
app.delete("/biere/:id", authBasic, (req, res)=>{
    res.json({id : req.params.id});
})
*/
app.listen(8080, function(){
    console.log("Démarrer, j'écoute sur le port 8080");
})