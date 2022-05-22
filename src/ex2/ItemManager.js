import PokemonClient from "./PokemonClient.js";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
  }

  async addItem(item) {
    const pokemonClient = new PokemonClient();

    if (parseInt(item.text)) {
      if (pokemonClient.validatePokemonId(item.text)) {
        const pokemonName = await pokemonClient.fetchPokemonNameById(item.text);
        item.text = `Catch ${pokemonName}`;
      } else {
        item.text = "invalid input";
      }
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
