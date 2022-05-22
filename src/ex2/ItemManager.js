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

  removeItem(id) {
    this.itemsList = this.itemsList.filter((item) => item.id !== id);
  }

  toggleCheckedItem(id) {
    this.itemsList = this.itemsList.map((item) =>
      item.id === id ? { ...item, complete: !item.complete } : item
    );
  }

  getAllItems() {
    return this.itemsList;
  }
}
