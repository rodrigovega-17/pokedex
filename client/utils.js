let typeNames = []

function get_element_li (id, name, weight, height, base_experience) {
    return `<li class="added-item"><img class = "img"> 
            Pokemon: ${name} 
            ID: ${id} 
            Weight:<span class="pokeWeight"> ${weight}</span> 
            Height: ${height} 
            Base experience ${base_experience} 
            Types: ${typeNames}  
            <button class="remove-item">remove</button></li>`
}

let total = 0;

function Recalculate () {
    total = 0;
    let List = document.getElementById("list");
    let pokemons = List.getElementsByClassName("added-item")
    for (var i = 0; i < pokemons.length; i++) {
        let weight = pokemons[i].getElementsByClassName("pokeWeight")[0];
        let pokeWeight = Number(weight.innerHTML);
        total += pokeWeight;
    }
    document.getElementById("total").innerHTML = `Total: ${total}`;
}

let add_item_to_list_with_template = (pokeId, pokeName, pokeWeight, photo, height,base_experience) => {
    //let itemValue = document.querySelector("#item-value").value.trim();
    let liVal = get_element_li(pokeId, pokeName, pokeWeight, height, base_experience);
    total += Number(pokeWeight);
    document.getElementById("total").innerHTML = `Total: ${total}`;
    let list = document.getElementById("list");
    let element = document.createElement("li");
    element.innerHTML = liVal;
    list.append(element);
    //Add photo
    let image = element.getElementsByClassName("img")[0];
    image.src = photo;
    // add event listener to the button inside the element just added with the remove_item function
    let bttn = element.getElementsByClassName("remove-item")[0];
    bttn.addEventListener("click", remove_item());
    //addToTotal();
    
}

let thenable_handle_for_the_result_of_the_pokemon_request = (result) => {
    //handle here the pokemon from the request+
    for(var i=0; i<result.data.types.length;i++){
        console.log(result.data.types[i].type.name)
        typeNames.push(result.data.types[i].type.name)
    }
    add_item_to_list_with_template( result.data.id, 
                                    result.data.species.name, 
                                    result.data.weight, 
                                    result.data.sprites.front_default,
                                    result.data.height,
                                    result.data.base_experience)
}
  
let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
    //handle here the pokemon error from the request
    alert("POKEMON NOT FOUND!!!")
}

let remove_item  = (/*node_to_remove*/) => {
    return (event)=>{
        let node_to_remove = event.target;
        node_to_remove.parentNode.parentNode.remove();
        Recalculate();
    }
}

let get_pokemon_data = () => {
    return (event) => {
        let pokeName = document.querySelector("#pokeName").value.trim();
        pokeName = pokeName.toLowerCase();

        if (pokeName.length == 0){
            console.log("Please get a name");
            return;
        }

        axios
        .get('http://localhost:3000/getpokemon',{
            pokeName: pokeName
        })
        .then(function (response) {
            thenable_handle_for_the_result_of_the_pokemon_request(response);
        })
        .catch(function (error) {
            catchable_handle_for_the_error_of_the_pokemon_request(error);
        });
    }
}


document.getElementById("add-item").addEventListener("click", get_pokemon_data());