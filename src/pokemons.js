const getPokemonTitleAndUrl = async () => {
  const result = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
  const data = await result.json();

  return data.results;
};

const getAllPokemons = async () => {
  const pokemons = await getPokemonTitleAndUrl();
  const pokemonsWithAllInformation = [];

  pokemons.forEach( async (pokemon) => {
    const name = pokemon.name;
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await result.json();
    pokemonsWithAllInformation.push(data);
  });

  return pokemonsWithAllInformation;
};


export { getAllPokemons };