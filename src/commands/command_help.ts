import type { State } from 'src/state.js';

export async function commandHelp(state: State): Promise<void> {
  console.log();
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n');
  for (const cmd of Object.values(state.commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
