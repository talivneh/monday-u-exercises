export default class PokemonClient {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
  }

  async isPokemonName(item) {
    let pokemon;
    const isPokemonFormat = /^[0-9]*$/;
    if (isPokemonFormat.test(item)) {
      const pokemonId = parseInt(item);
      pokemon = await this.fetchPokemonNameById(pokemonId);
      if (pokemon.name) return pokemon.name;
      return `Couldn't fetch Pokemon with ID ${pokemonId}`;
    } else {
      pokemon = await this.fetchPokemonByName(item);
      if (pokemon.name) return pokemon.name;
      return null;
    }
  }

  async fetchPokemonNameById(id) {
    let name, error;
    try {
      const pokemon = await fetch(`${this.API_BASE}/pokemon/${id}/`, {
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

  async fetchPokemonByName(PokemonName) {
    let name, error;
    try {
      const pokemon = await fetch(`${this.API_BASE}/pokemon/${PokemonName}/`, {
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
}
