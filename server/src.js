const express = require('express')
const app = express()
app.use(express.json())

let savedPokemon = {};
  
app.get('/getpokemon/:pokeName', function (req, res) {
    let pokeName = req.params.pokeName;

    if (pokeName.length == 0){
        res.send("Please get a name")
    }
    if (savedPokemon[pokeName]){
        res.send(savedPokemon[pokeName])
    }
    axios
    .get('https://pokeapi.co/api/v2/pokemon/' + pokeName)
    .then(function (response) {
        res.send(response);
        savedPokemon[pokeName] = response;
    })
    .catch(function (error) {
        res.send(error);
    });
})
  
   
app.listen(3000)