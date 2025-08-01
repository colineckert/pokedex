import { L } from 'vitest/dist/chunks/environment.d.cL3nLXbE.js';
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

    const data = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<LocationResponse> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cachedResponse = this.cache.get<LocationResponse>(url);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Location not found: ${locationName}`);
    }

    const data = await response.json();
    this.cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next?: string;
  previous?: string;
  results: Location[];
};

export type LocationResponse = {
  id: number;
  location: Location;
  pokemon_encounters: { pokemon: { name: string } }[];
};

export type Location = {
  name: string;
  url: string;
};
