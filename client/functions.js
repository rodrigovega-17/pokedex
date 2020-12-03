let typeNames = []

function get_element_ul (id, name, weight, height, base_experience) {
    return `<ul class="added-item"><img class = "img center"> 
            Pokemon: ${name} –
            ID: ${id} –
            Weight:<span class="pokeWeight"> ${weight}</span> –
            Height: ${height} –
            Base experience ${base_experience} –
            Types: ${typeNames}  
            <button class="remove-item">quitar</button></ul>`
}

// Despliega datos de nuevo item con plantilla de get_element_ul
let add_item_to_list_with_template = (pokeId, pokemonName, pokeWeight, photo, height,base_experience) => {
    let ulVal = get_element_ul(pokeId, pokemonName, pokeWeight, height, base_experience);
    let list = document.getElementById("list");
    let element = document.createElement("ul");
    element.innerHTML = ulVal;
    list.append(element);
    //se añade foto a item y se le da formato
    let image = element.getElementsByClassName("img")[0];
    image.src = photo;
    image.height = 250;
    image.width = 250;
    // se añade eventListener para quitar un item con la funcion remove_item
    let bttn = element.getElementsByClassName("remove-item")[0];
    bttn.addEventListener("click", remove_item());
    


}

//cuando se encuentra un pokemon de la API
let thenable_handle_for_the_result_of_the_pokemon_request = (result) => {
    
    typeNames = [];
    for(var i=0; i<result.data.types.length;i++){
        typeNames.push(result.data.types[i].type.name)
    }
    add_item_to_list_with_template( result.data.id, 
                                    result.data.species.name, 
                                    result.data.weight, 
                                    result.data.sprites.front_default,
                                    result.data.height,
                                    result.data.base_experience)
}
  
// Cuando no se encuentra pokemon de la API
let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
    
    alert("POKEMON NOT FOUND!!!")
}

let remove_item  = () => {
    return (event)=>{
        let node_to_remove = event.target;
        node_to_remove.parentNode.parentNode.remove();
    }
}

let get_pokemon_data = () => {
    return (event) => {
        let pokemonName = document.querySelector("#pokemonName").value.trim();
        pokemonName = pokemonName.toLowerCase();

        if (pokemonName.length == 0){
            console.log("Please get a name");
            return;
        }

        axios
        .get('http://localhost:3000/getpokemon/'+pokemonName,{
        })
        .then(thenable_handle_for_the_result_of_the_pokemon_request)
        .catch(catchable_handle_for_the_error_of_the_pokemon_request)
    }
}


document.getElementById("add-item").addEventListener("click", get_pokemon_data());
