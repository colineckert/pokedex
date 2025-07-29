import type { CLICommand } from 'src/state.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: 'map',
      description: 'Returns Pokémon locations',
      callback: commandMap,
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
