import type { CLICommand } from 'src/state.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapB } from './command_map.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: 'map',
      description: 'Returns Pokémon locations',
      callback: commandMap,
    },
    mapb: {
      name: 'mapb',
      description: 'Returns previous Pokémon locations',
      callback: commandMapB,
    },
    explore: {
      name: 'explore',
      description: 'Explore a specific Pokémon location',
      callback: commandExplore,
    },
    catch: {
      name: 'catch',
      description: 'Catch a Pokémon by name',
      callback: commandCatch,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    exit: {
      name: 'exit',
      description: 'Exit the pokedex',
      callback: commandExit,
    },
  };
}
