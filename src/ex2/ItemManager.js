export default class ItemManager {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
  }

  async addPokemone() {}

  async removePokemone() {}

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
