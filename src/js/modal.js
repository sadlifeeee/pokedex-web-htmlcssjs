var modalPokemonInfo;

function modalLoader() {
    var modal = document.getElementById("pokemonModal");
    var pokemonCard = []

    for(let i = startPokemon; i < endPokemon; i++) {
            
        pokemonCard[i] = document.getElementsByClassName("pokeInfoContainer")[i - startPokemon];

        pokemonCard[i].onclick = async function() {
            modal.style.display = "block";

            let pokemonName = document.getElementsByClassName("pokeIDName")[i - startPokemon].textContent.split(" ")[1].toLowerCase()

            await getPokemonInfo(pokemonName) 

            displayPokemonInfo() 
            
        }
    }

    var close = document.getElementsByClassName("close")[0];

    close.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

async function getPokemonInfo(num) {

    if(typeof i === "number"){
        num += 1
    }

    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);

    let pokemon = await res.json();
    
    let pokemonPhotoID = ""

    if(pokemon.id < 10) 
        pokemonPhotoID = "00" + pokemon.id.toString();
    else if(pokemon.id < 100 && pokemon.id >= 10) 
        pokemonPhotoID = "0" +  pokemon.id.toString();
    else 
        pokemonPhotoID =  pokemon.id.toString();

    modalPokemonInfo = {
        "id": pokemon.id,
        "idPhoto": pokemonPhotoID,
        "name" : pokemon.name,
        "type" : pokemon.types,
        "height": (pokemon.height /3.048 ).toFixed(1),
        "weight": (pokemon.weight / 4.536).toFixed(1),
        "ability": pokemon.abilities,
        "stats" : pokemon.stats
    }


}

function displayPokemonInfo() {

    pokemonInfoName = document.getElementById("pokemonInfoName");
    pokemonInfoImage = document.getElementById("pokemonInfoImage");

    hp = document.getElementById("hp");
    atk = document.getElementById("atk");
    def = document.getElementById("def");
    satk = document.getElementById("satk");
    sdef = document.getElementById("sdef");
    speed = document.getElementById("speed");

    height = document.getElementById("height");
    weight = document.getElementById("weight");
    ability = document.getElementById("ability");

    type = document.getElementById("type");

    pokemonInfoName.innerHTML  = modalPokemonInfo.idPhoto + ". " + modalPokemonInfo.name[0].toUpperCase() + modalPokemonInfo.name.slice(1);
    pokemonInfoImage.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + modalPokemonInfo.idPhoto + ".png"

    hp.innerHTML = "HP: " + modalPokemonInfo.stats[0].base_stat
    atk.innerHTML = "Attack: " + modalPokemonInfo.stats[1].base_stat
    def.innerHTML = "Defense: " + modalPokemonInfo.stats[2].base_stat
    satk.innerHTML = "Special-Attack: " + modalPokemonInfo.stats[3].base_stat
    sdef.innerHTML = "Special-Defense: " + modalPokemonInfo.stats[4].base_stat
    speed.innerHTML = "Speed: " + modalPokemonInfo.stats[5].base_stat

    height.innerHTML = modalPokemonInfo.height + "ft"
    weight.innerHTML = modalPokemonInfo.weight + "lbs"

    pokemonAbilities = ""

    for(let i = 0; i < modalPokemonInfo.ability.length; i++) {
        if(i + 1 != modalPokemonInfo.ability.length)
            pokemonAbilities += modalPokemonInfo.ability[i].ability.name[0].toUpperCase() + modalPokemonInfo.ability[i].ability.name.slice(1) + " or ";
        else 
            pokemonAbilities += modalPokemonInfo.ability[i].ability.name[0].toUpperCase() + modalPokemonInfo.ability[i].ability.name.slice(1);
    }
    
    ability.innerHTML =  pokemonAbilities


    let pokemonTypeText = "";

    let pokemonTypeLength = modalPokemonInfo.type.length

    for(var k = 0; k < pokemonTypeLength; k++) {
        pokemonTypeText += modalPokemonInfo.type[k].type.name[0].toUpperCase() + modalPokemonInfo.type[k].type.name.slice(1) + " ";
    }

    type.innerHTML = pokemonTypeText

    displayWeakness()  

}

async function nextPokemon() {

    if(modalPokemonInfo.id != endPokemon){
        await getPokemonInfo(modalPokemonInfo.id + 1) 

        displayPokemonInfo() 
    }
}

async function previousPokemon() {

    if(modalPokemonInfo.id - 1 != 0){
        await getPokemonInfo(modalPokemonInfo.id - 1) 

        displayPokemonInfo() 
    }
    
}