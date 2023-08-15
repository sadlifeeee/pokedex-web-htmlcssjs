const totalPokemon = 1010; 

var totalGenerationPokemon = new Map()

totalGenerationPokemon.set("1", [0 , 150])
.set("2" , [151 , 250])
.set("3" , [251 , 385])
.set("4" , [386 , 492])
.set("5" , [494 , 648])
.set("6" , [649 , 720])
.set("7" , [721 , 808])
.set("8" , [809 , 904])
.set("9" , [905 , 1010])

var pokedex = []
var pokedexNameList = []
var selectedGeneration;
var startPokemon;
var endPokemon;

window.onload = async function () {
    
    selectedGeneration = document.querySelector('#generationContainer')
    
    var loading = document.createElement("p")
    loading.innerHTML = "Loading Pokedex..."
    loading.id = "loading"
    document.getElementById("loadingDiv").append(loading)

    startPokemon = totalGenerationPokemon.get(selectedGeneration.value)[0]
    endPokemon = totalGenerationPokemon.get(selectedGeneration.value)[1]

    for(var i = startPokemon; i < endPokemon; i++) {

        await getPokemon(i);
    }
    
    document.getElementById("loadingDiv").innerHTML = ""

    changeSort()

    document.getElementById("sortContainer").addEventListener("change", changeSort)
    
    document.getElementById("generationContainer").addEventListener("change", changeGeneration)
    
    document.getElementById("search").addEventListener("input", search)

    document.getElementById("next").addEventListener("click", nextPokemon)

    document.getElementById("back").addEventListener("click", previousPokemon)

}

async function getPokemon(num) {

    if(typeof num === "number"){
        num += 1
    }

    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);

    let pokemon = await res.json();

    let pokemonPhotoID = ""
    
    if(num < 10) 
        pokemonPhotoID = "00" + num.toString();
    else if(num < 100 && num >= 10) 
        pokemonPhotoID = "0" + num.toString();
    else 
        pokemonPhotoID = num.toString();

    pokedex[num - 1] = {
        "id": pokemon.id,
        "idPhoto": pokemonPhotoID,
        "name" : pokemon.name,
        "type" : pokemon.types
    }

    pokedexNameList[num - 1] = pokemon.name    
}

async function changeGeneration() {


    pokedex = []
    pokedexNameList = []
    
    document.getElementById("pokedexBody").innerHTML = ""

    selectedGeneration = document.querySelector('#generationContainer')

    startPokemon = totalGenerationPokemon.get(selectedGeneration.value)[0]
    endPokemon = totalGenerationPokemon.get(selectedGeneration.value)[1]
    
    for(var i = startPokemon; i < endPokemon; i++) {

        await getPokemon(i);
    }

    changeSort()
}

function changeSort() {
    
    var selectElement = document.querySelector('#sortContainer')

    if(selectElement.value == "id") {

        pokedex = pokedex.sort(byID);

        for(let i = 0; i < endPokemon-startPokemon; i++) {
            pokedexNameList[i] = pokedex[i].name    
        }

        displayPokemon()
    }
    else {
        
        pokedex = pokedex.sort(byName);
        pokedexNameList = pokedexNameList.sort();
        displayPokemon()
    }
    
}


function displayPokemon() {

    document.getElementById("pokedexBody").innerHTML = ""

    for(var i = 0; i < endPokemon - startPokemon; i++) {
        
        // Pokemon ID & Name
        let pokemonIDName = document.createElement("span");
        pokemonIDName.id = "pokemonIDName"
        pokemonIDName.classList.add("infoText");
        pokemonIDName.classList.add("pokeIDName");

        pokemonIDName.innerHTML = pokedex[i].idPhoto + ". " + pokedex[i].name[0].toUpperCase() + pokedex[i].name.slice(1);

        // Pokemon Type
        let pokemonType = document.createElement("p");
        pokemonType.setAttribute("id" , "pokemonType");
        pokemonType.classList.add("infoText");

        let pokemonTypeText = "";

        let pokemonTypeLength = pokedex[i].type.length

        for(var k = 0; k < pokemonTypeLength; k++) {
            pokemonTypeText += pokedex[i].type[k].type.name[0].toUpperCase() + pokedex[i].type[k].type.name.slice(1) + " ";
        }

        pokemonType.innerHTML = pokemonTypeText

        // Loading Photo
        let pokemonPhoto = document.createElement('img')
        pokemonPhoto.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + pokedex[i].idPhoto + ".png"
        pokemonPhoto.setAttribute("id" , "pokemonPhoto");

        // Creating PokemonCard
        let pokemonCard = document.createElement('div');
        pokemonCard.classList.add("pokeInfoContainer");

        pokemonCard.appendChild(pokemonPhoto);
        pokemonCard.appendChild(pokemonIDName);
        pokemonCard.appendChild(pokemonType);

        document.getElementById("pokedexBody").append(pokemonCard)
        
    }

    
    modalLoader()

}




