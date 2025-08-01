import type { State } from 'src/state.js';

export async function commandMap(state: State) {
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  if (!locations) {
    console.log('No locations found.');
    return;
  }

  // display locations
  for (const location of locations.results) {
    console.log(location.name);
  }

  // update state with new URLs
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}

export async function commandMapB(state: State) {
  const locationsData = await state.pokeAPI.fetchLocations(
    state.prevLocationsURL
  );
  if (!locationsData) {
    console.log('No previous locations found.');
    return;
  }

  // display locations
  for (const location of locationsData.results) {
    console.log(location.name);
  }

  // update state with new URLs
  state.nextLocationsURL = locationsData.next;
  state.prevLocationsURL = locationsData.previous;
}
