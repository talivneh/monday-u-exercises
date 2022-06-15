import fetch from "node-fetch";

export default async function fetchPokemon(text) {
  const API_BASE = "https://pokeapi.co/api/v2";
  let name, error;
  try {
    const pokemon = await fetch(`${API_BASE}/pokemon/${text}`, {
      headers: {
        mode: "no-cors",
      },
    });
    const pokemonsJson = await pokemon.json();
    name = pokemonsJson.name;
  } catch {
    (err) => {
      error = err;
    };
  }
  return { name, error };
}
