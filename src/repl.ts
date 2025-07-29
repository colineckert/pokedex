import { getCommands } from "./commands/command.js";
import type { State } from "./state.js";

export function cleanInput(str: string): string[] {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0);
}

export function startREPL(state: State): void {
  // display prompt
  state.readline.prompt();

  // listen for input
  state.readline.on("line", (line) => {
    // clean input
    const args = cleanInput(line);

    // handle commands
    if (args.length === 0) {
      state.readline.prompt();
      return;
    }

    const command = state.commands[args[0]];
    if (command) {
      try {
        command.callback(state);
      } catch (error) {
        console.error(`Error executing command '${args[0]}':`, error);
      }
    } else {
      console.log(`Unknown command: ${args[0]}`);
      state.commands.help.callback(state);
    }

    // display prompt again
    state.readline.prompt();
  });
}
