import PokemonClient from "./PokemonClient.js";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
    this.pokemonClient = new PokemonClient();
  }

  async addItem(item) {
    const newPokemonItem = await this.pokemonClient.fetchPokemon(item.text);
    if (newPokemonItem) {
      const pokemon = `Catch ${newPokemonItem}`;
      this.itemsList.push({ ...item, name: pokemon });
    } else {
      this.itemsList.push(item);
    }
  }

  removeItem(text) {
    this.itemsList = this.itemsList.filter((item) => item.text !== text);
  }

  getAllItems() {
    return this.itemsList;
  }
}
