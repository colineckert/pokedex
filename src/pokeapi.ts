import { Cache } from './pokecache.js';
export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area?limit=20`;
    const cachedResponse = this.cache.get<ShallowLocations>(url);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    this.cache.add(url, response);
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location/${locationName}`;
    const cachedResponse = this.cache.get<Location>(url);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Location not found: ${locationName}`);
    }

    this.cache.add(url, response);
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
