export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(
      pageURL || `${PokeAPI.baseURL}/location?limit=20`
    );
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
    if (!response.ok) {
      throw new Error(`Location not found: ${locationName}`);
    }
    return response.json();
  }
}

export type ShallowLocations = {
  count: number;
  next?: string;
  previous?: string;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};
