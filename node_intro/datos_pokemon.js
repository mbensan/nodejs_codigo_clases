const axios = require('axios');

const pokemon_id = process.argv[2];

console.log(`Obtieniendo los datos del pokemon ${pokemon_id}`);

async function get_datos(id) {
  const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon = respuesta.data;
  console.log(`El pokemon se llama ${pokemon.name}`);
  //console.log(`El pokemon se llama ${pokemon.name}`);
}

get_datos(pokemon_id)