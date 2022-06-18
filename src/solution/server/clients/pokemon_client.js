// The Pokemon Client (using axios) goes here
const axios = require("axios");

async function fetchPokemon(text) {
  const API_BASE = "https://pokeapi.co/api/v2";
  let name, error;
  try {
    const pokemon = await axios.get(`${API_BASE}/pokemon/${text}`);
    name = pokemon.data.name;
  } catch (err) {
    error = err;
  }
  return { name, error };
}

module.exports = {
  fetchPokemon,
};
