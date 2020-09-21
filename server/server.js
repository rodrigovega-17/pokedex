const express = require('express')
const axios = require("axios")
const app = express()
app.use(express.json())

let savedPokemon = {};
  
app.get('/getpokemon/:pokeName', function (req, res) {
    let pokeName = req.params.pokeName;
    console.log(pokeName)
    if (pokeName.length == 0){
        res.send("Please get a name");
    }
    if (savedPokemon[pokeName]){
        res.send(savedPokemon[pokeName]);
    }

    axios
    .get('https://pokeapi.co/api/v2/pokemon/caterpie' )
    .then(function (response) {
        res.send(response);
        savedPokemon[pokeName] = response;
        console.log("Inside then")
    })
    .catch(function (error) {
        res.send("error");
        console.log("Inside catch")
    });
})
  
   
app.listen(3000)