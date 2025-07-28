import { createInterface } from "readline";
import { getCommands } from "./commands/command.js";

export function cleanInput(str: string): string[] {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0);
}

export function startREPL() {
  // create interface for reading input
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // display prompt
  rl.prompt();

  // listen for input
  rl.on("line", (line) => {
    // clean input
    const args = cleanInput(line);

    // handle commands
    if (args.length === 0) {
      rl.prompt();
      return;
    }

    const commands = getCommands();
    const command = commands[args[0]];
    if (command) {
      try {
        command.callback(commands);
      } catch (error) {
        console.error(`Error executing command '${args[0]}':`, error);
      }
    } else {
      console.log(`Unknown command: ${args[0]}`);
      commands.help.callback(commands);
    }

    // display prompt again
    rl.prompt();
  });
}
