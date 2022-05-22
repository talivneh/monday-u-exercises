import PokemonClient from "./PokemonClient.js";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
    this.pokemonClient = new PokemonClient();
  }

  async addItem(item) {
    const isPokemonFormat = /^[0-9]*$/;
    if (isPokemonFormat.test(item.text)) {
      const pokemonId = parseInt(item.text);
      const pokemonName = await this.pokemonClient.fetchPokemonNameById(
        pokemonId
      );
      item.text = pokemonName;
    } else {
      const pokemonName = await this.pokemonClient.fetchPokemonByName(
        item.text
      );
      if (pokemonName) {
        item.text = pokemonName;
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
