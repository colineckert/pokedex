import { State } from 'src/state.js';

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const name = args[0];
  if (!name) {
    console.error('Please provide a Pokémon name to catch.');
    return Promise.resolve();
  }

  console.log(`Throwing a Pokeball at ${name}...`);
  // Implement catch logic here
  try {
    const pokemon = await state.pokeAPI.fetchPokemon(name);
    if (!pokemon) {
      console.error(`Pokémon ${name} not found.`);
      return;
    }

    // Higher base_experience means harder to catch
    const catchProbability = Math.max(0.2, 1 - pokemon.base_experience / 300); // never less than 20% chance
    if (Math.random() > catchProbability) {
      console.log(`${pokemon.name} escaped!`);
      return;
    }

    console.log(`${pokemon.name} was caught!`);
    state.Pokedex[name] = pokemon;
  } catch (error) {
    console.error(`Failed to fetch ${name}:`, error);
  }
}
