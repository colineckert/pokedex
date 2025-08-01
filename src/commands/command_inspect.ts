import { State } from 'src/state.js';

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const name = args[0];
  if (!name) {
    console.error('Please provide a Pokémon name to inspect.');
    return;
  }

  const pokemon = state.Pokedex[name];
  if (!pokemon) {
    console.log('you have not caught that pokemon');
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log(`Stats:`);
  pokemon.stats.forEach((stat) => {
    console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log(`Types:`);
  pokemon.types.forEach((type) => {
    console.log(`  - ${type.type.name}`);
  });
}
