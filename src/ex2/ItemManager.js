import PokemonClient from "./PokemonClient";

export default class ItemManager {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
    this.POKEMON_LIST = [];
    this.pokemonClient = new PokemonClient();
  }

  async addPokemone(id) {
    const pokemonName = await pokemonClient
      .fetchAllPokemons()
      .then((pokemonsList) => pokemonsList[id].name);

    this.POKEMON_LIST.push({ id, name: pokemonName });
  }

  removePokemone(id) {
    this.POKEMON_LIST = this.POKEMON_LIST.filter(
      (pokemonItem) => pokemonItem.id !== id
    );
  }

  getAllPokemons() {
    return this.POKEMON_LIST;
  }
}
