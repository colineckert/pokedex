import { State } from 'src/state.js';

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const locationName = args[0];
  if (!locationName) {
    console.error('Please provide a location name to explore.');
    return;
  }

  try {
    const response = await state.pokeAPI.fetchLocation(locationName);
    console.log(`Exploring ${locationName}...`);
    console.log('Found Pokemon:');
    for (const encounter of response.pokemon_encounters) {
      console.log(`- ${encounter.pokemon.name}`);
    }
  } catch (error) {
    console.error(`Failed to explore location "${locationName}":`, error);
  }
}
