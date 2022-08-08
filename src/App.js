import "./style.css"
import React, { useState } from "react";
import Axios from "axios";

function App(){

    const [pokemonName, setpokemonName] = useState("");
    const [pokemonChosen, setpokemonChosen] = useState(false);
     const [pokemon, setpokemon] = useState({
        name: "",
        species:"",
        img: "",
        hp: "",
        attack: "",
        defense:"",
        special_attack: "",
     });


      function searchPokemon(){
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLocaleLowerCase()}`).then(function(response){
            setpokemon({
                name: pokemonName,
                species: response.data.species.name,
                img: response.data.sprites.front_default,
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                special_attack: response.data.stats[3].base_stat,
            });
            setpokemonChosen(true);
        })
      }

    function pokename(event){
     setpokemonName(event.target.value);
    }
    return <div className="heading">
    <div className="title">
      <h1>Pokemon Finder</h1>
      <input type="text" onChange={pokename} placeholder="Pokemon"></input>
      <button type="submit" onClick={searchPokemon}>Search Pokemon</button>
      </div>
       <div className="Display">
       {!pokemonChosen ? <h1>Please choose a Pokemon</h1>
        : 
        <>
       <img src={pokemon.img} alt={pokemon.name} />
       <h2>Species: {pokemon.species.toLocaleUpperCase()}</h2>
       <h2>Hp: {pokemon.hp}</h2>
       <h2>Attack: {pokemon.attack}</h2>
       <h2>Defense: {pokemon.defense}</h2>
       <h2>Special-Attack: {pokemon.special_attack}</h2>
       </>}
       </div>
    </div>
}

export default App;