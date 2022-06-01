import PokemonClient from "./PokemonClient.js";

export default class ItemManager {
  constructor() {
    this.itemsList = [];
    this.pokemonClient = new PokemonClient();
  }

  async addItem(item) {
    const newPokemonItem = await this.pokemonClient.isPokemonName(item.text);
    if (newPokemonItem) {
      const pokemon = `Catch ${newPokemonItem}`;
      this.itemsList.push({ ...item, name: pokemon });
      return pokemon;
    } else {
      this.itemsList.push(item);
      return item.text;
    }
  }

  removeItem(text) {
    this.itemsList = this.itemsList.filter((item) => item.text !== text);
  }

  getAllItems() {
    return this.itemsList;
  }
}
