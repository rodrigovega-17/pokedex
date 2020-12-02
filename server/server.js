const express = require('express')
const axios = require("axios")
const app = express()
const cors = require('cors') 
app.use(express.json())
app.use(cors())
let savedPokemon = {};



  
app.get('/getpokemon/:pokeName', function (req, res) {
    let pokeName = req.params.pokeName;
    //console.log(pokeName)
    if (pokeName.length == 0){
        res.send("Please get a name");
    }
    if (savedPokemon[pokeName]){
        res.send(savedPokemon[pokeName]);
    }

    axios
    .get('https://pokeapi.co/api/v2/pokemon/' + pokeName)
    .then(function (response) {
        let pokemon = response.data
        //console.log(pokemon);
        savedPokemon[pokeName] = pokemon;
        res.send(savedPokemon[pokeName]);
        //console.log("Inside then");
    })
    .catch(function (error) {
        res.send(error);
        //console.log(error);
        //console.log("Inside catch");
    });
})
  
   
app.listen(3000)