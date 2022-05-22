export default class PokemonClient {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
  }

  async fetchAllPokemons() {
    try {
      const pokemons = await fetch(
        `${this.API_BASE}/pokemon?limit=100000&offset=0`
      );
      const pokemonsJson = await pokemons.json();

      return pokemonsJson.results;
    } catch {
      (err) => console.log(err);
    }
  }

  validatePokemonId(id) {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!format.test(id)) {
      return true;
    }

    return false;
  }

  async fetchPokemonNameById(id) {
    if (id > 1000) {
      return `Failed to fetch pokemon with ID ${id}`;
    }

    try {
      const pokemonsList = await this.fetchAllPokemons();
      return pokemonsList[id].name;
    } catch {
      (err) => "problem with input";
    }
  }
}
