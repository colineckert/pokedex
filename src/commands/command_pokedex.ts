import { State } from 'src/state.js';

export async function commandPokedex(state: State): Promise<void> {
  if (Object.keys(state.Pokedex).length === 0) {
    console.log('Your Pokedex is empty. Go catch some Pokémon!');
    return;
  }

  console.log('Your Pokedex:');
  for (const name in state.Pokedex) {
    console.log(`- ${name}`);
  }
}
