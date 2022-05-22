export default class PokemonClient {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
  }

  async fetchPokemonNameById(id) {
    try {
      const pokemon = await fetch(`${this.API_BASE}/pokemon/${id}/`, {
        headers: {
          mode: "no-cors",
        },
      });
      const pokemonsJson = await pokemon.json();
      if (pokemon) {
        return `Catch ${pokemonsJson.name}`;
      } else {
        return `Pokemon with ID ${id} was not found`;
      }
    } catch {
      (err) => console.log(err);
    }

    return `Failed to fetch Pokemon with ID ${id}`;
  }
}
