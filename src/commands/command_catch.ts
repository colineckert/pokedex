import { State } from 'src/state.js';

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.error('Please provide a Pokémon name to catch.');
    return Promise.resolve();
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  // Implement catch logic here
  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    if (!pokemon) {
      console.error(`Pokémon ${pokemonName} not found.`);
      return Promise.resolve();
    }

    const chance = Math.random() * 100;
    if (chance >= pokemon.base_experience) {
      state.Pokedex[pokemonName] = pokemon;
      console.log(`${pokemon.name} was caught!`);
    } else {
      console.log(`${pokemon.name} escaped!`);
    }
  } catch (error) {
    console.error(`Failed to catch ${pokemonName}:`, error);
  }

  return Promise.resolve();
}
