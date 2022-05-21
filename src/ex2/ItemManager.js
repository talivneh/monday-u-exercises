export default class ItemManager {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
    this.POKEMON_LIST = [];
  }

  async addPokemone(id) {
    const pokemonName = await this.getAllPokemons().then(
      (pokemonsList) => pokemonsList[id].name
    );

    this.POKEMON_LIST.push({ id, name: pokemonName });
  }

  removePokemone() {}

  async getAllPokemons() {
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
}
