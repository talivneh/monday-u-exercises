import PokemonClient from "./PokemonClient";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
    this.pokemonClient = new PokemonClient();
  }

  async addItem(id, isPokemon, text) {
    let name;

    if (isPokemon) {
      text = await pokemonClient
        .fetchAllPokemons()
        .then((pokemonsList) => pokemonsList[id].name);
    }

    this.itemsList.push({ id, text: text ? text : name });
  }

  removeItem(id) {
    this.itemsList = this.itemsList.filter((item) => item.id !== id);
  }

  getAllItems() {
    return this.itemsList;
  }
}
