function displayWeakness() {

    weakness = document.getElementById("weakness")
    //weakness.innerHTML = 

    weaknessMap = new Map();

    weaknessMap.set("Normal" , ["Fighting"]);
    weaknessMap.set("Fire" , ["Water", "Ground", "Rock"]);
    weaknessMap.set("Water" , ["Grass" , "Electric"]);
    weaknessMap.set("Grass" , ["Fire", "Ice" , "Poison" , "Flying" , "Bug"]);
    weaknessMap.set("Electric" , ["Ground"]);
    weaknessMap.set("Ice" , ["Fire", "Fighting", "Rock"]);
    weaknessMap.set("Fighting" , ["Flying", "Psychic"]);
    weaknessMap.set("Poison" , ["Ground", "Psychic" , "Bug"]);
    weaknessMap.set("Ground" , ["Water" , "Grass" , "Ice"]);
    weaknessMap.set("Flying" , ["Rock" , "Electric" , "Ice"]);
    weaknessMap.set("Psychic" , ["Bug"]);
    weaknessMap.set("Bug" , ["Flying" , "Poison", "Fire" , "Rock"]);
    weaknessMap.set("Rock" , ["Fighting" , "Ground" , "Water", "Grass"]);
    weaknessMap.set("Ghost" , ["Ghost"]);
    weaknessMap.set("Dragon" , ["Ice", "Dragon"]);

    superEffMap = new Map();
    
    superEffMap.set("Normal" , ["Normal"]);
    superEffMap.set("Fire" , ["Fire", "Bug", "Grass", "Ice"]);
    superEffMap.set("Water" , ["Water", "Ground" , "Rock" , "Fire"]);
    superEffMap.set("Grass" , ["Grass", "Ground", "Rock" , "Water"]);
    superEffMap.set("Electric" , ["Electric", "Flying" , "Water"]);
    superEffMap.set("Ice" , ["Ice" , "Flying", "Ground", "Grass" , "Dragon"]);
    superEffMap.set("Fighting" , ["Fighting", "Normal", "Rock" , "Ice"]);
    superEffMap.set("Poison" , ["Poison", "Bug", "Grass" ]);
    superEffMap.set("Ground" , ["Ground", "Poison" , "Rock" , "Fire", "Electric"]);
    superEffMap.set("Flying" , ["Flying", "Fighting" , "Bug" , "Grass"]);
    superEffMap.set("Psychic" , ["Psychic", "Fighting" , "Poison" ]);
    superEffMap.set("Bug" , ["Bug" , "Poison" , "Grass", "Psychic"]);
    superEffMap.set("Rock" , ["Rock", "Flying" , "Bug" , "FIre", "Ice"]);
    superEffMap.set("Ghost" , ["Ghost"]);
    superEffMap.set("Dragon" , ["Dragon"]);


    let weaknessList = [];

    let pokemonTypeLength = modalPokemonInfo.type.length

    for(var k = 0; k < pokemonTypeLength; k++) {
        temp = weaknessMap.get(modalPokemonInfo.type[k].type.name[0].toUpperCase() + modalPokemonInfo.type[k].type.name.slice(1))

        for(var i = 0; i < temp.length; i++) {
            weaknessList.push(temp[i])  
        }
    }

    for(var k = 0; k < pokemonTypeLength; k++) {
        temp = superEffMap.get(modalPokemonInfo.type[k].type.name[0].toUpperCase() + modalPokemonInfo.type[k].type.name.slice(1))

        for(var i = 0; i < temp.length; i++) {
            if(weaknessList.includes(temp[i]) == true) {

                while (weaknessList.indexOf(temp[i]) != -1) {
                    let index = weaknessList.indexOf(temp[i])
                    weaknessList.splice(index, 1)
                }

            }
        }

    }

    let uniq = [... new Set(weaknessList)]

    weakness.innerHTML = uniq


    

}   
