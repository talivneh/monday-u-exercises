export default class PokemonClient {
  constructor() {
    this.API_BASE = "https://pokeapi.co/api/v2";
  }

  async fetchAllPokemons() {
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

  async fetchPokemonNameById(id) {
    try {
      const pokemonsList = await this.fetchAllPokemons();
      if (pokemonsList[id].name) {
        return `Catch ${pokemonsList[id].name}`;
      } else {
        return `Faild to fetch Pokemon with ID ${id}`;
      }
    } catch {
      (err) => console.log();
    }

    return `Failed to fetch Pokemon with ID ${id}`;
  }

  async isPokemonName(item) {
    let pokemonName;
    const isPokemonFormat = /^[0-9]*$/;
    if (isPokemonFormat.test(item)) {
      const pokemonId = parseInt(item);
      pokemonName = await this.fetchPokemonNameById(pokemonId);
    } else {
      pokemonName = await this.fetchPokemonByName(item);
    }
    return pokemonName ? pokemonName : null;
  }

  // I found out that fetching all pokemon and then query them by ID
  // is alot faster then tryung to fetch each of them by id.
  // If you wish to see it - you can un-comment the next function
  // and comment out the other two above

  // async fetchPokemonNameById(id) {
  //   try {
  //     const pokemon = await fetch(`${this.API_BASE}/pokemon/${id}/`, {
  //       headers: {
  //         mode: "no-cors",
  //       },
  //     });
  //     const pokemonsJson = await pokemon.json();
  //     return `Catch ${pokemonsJson.name}`;
  //   } catch {
  //     (err) => console.log(err);
  //   }

  //   return `Failed to fetch Pokemon with ID ${id}`;
  // }

  async fetchPokemonByName(name) {
    try {
      const pokemonsList = await this.fetchAllPokemons();
      const pokemonName = pokemonsList.find(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
      ).name;
      return `Catch ${pokemonName}`;
    } catch {
      return false;
    }
  }
}
