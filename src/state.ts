import { createInterface, type Interface } from 'readline';
import { getCommands } from './commands/command.js';
import { PokeAPI } from './pokeapi.js';

export type State = {
  readline: Interface;
  pokeAPI: PokeAPI;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number): State {
  // create interface for reading input
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  // create PokeAPI instance
  const pokeAPI = new PokeAPI(cacheInterval);

  // create commands object
  const commands = getCommands();

  // return the state object
  return {
    commands,
    readline: rl,
    pokeAPI,
  };
}
