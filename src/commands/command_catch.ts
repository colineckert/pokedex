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
      return Promise.resolve();
    }

    const chance = Math.floor(Math.random() * pokemon.base_experience);
    if (chance > 40) {
      console.log(`${pokemon.name} escaped!`);
      return;
    }

    console.log(`${pokemon.name} was caught!`);
    console.log('You may now inspect it with the inspect command.');
    state.Pokedex[pokemon.name] = pokemon;
  } catch (error) {
    console.error(`Failed to fetch ${name}:`, error);
  }
}
