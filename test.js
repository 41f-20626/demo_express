// Source : https://expressjs.com/fr/

let express = require("express");

let app = express();



const fct1 = function(req,res, next){
    res.toto_le_magicien = "<h1>Bonjour , je suis une biere</h1>";
    next();
}

const fct2 = function(req,res){
    let message = res.toto_le_magicien;
    console.log(message);
    res.send(message + "<h2>je suis une biere, je suis aussi une bouteille de vin </h2>");
}


app.get("/", function(req,res){
    res.send("<h1>Bonjour !</h1>");
});

app.get("/biere/",fct1 , fct2);

app.listen(8080, function(){
    console.log("Démarrer, j'écoute sur le port 8080");
})





