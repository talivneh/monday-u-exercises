import PokemonClient from "./PokemonClient.js";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
  }

  async addItem(item) {
    const pokemonClient = new PokemonClient();

    if (parseInt(item.text)) {
      const pokemonId = parseInt(item.text);
      const pokemonName = await pokemonClient.fetchPokemonNameById(pokemonId);
      item.text = pokemonName;
    }

    this.itemsList.push(item);

    return item.text;
  }

  removeItem(text) {
    this.itemsList = this.itemsList.filter((item) => item.text !== text);
  }

  getAllItems() {
    return this.itemsList;
  }
}
