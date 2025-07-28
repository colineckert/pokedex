import { createInterface } from "readline";

export function cleanInput(str: string): string[] {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0);
}

export function commandExit() {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  Object.values(commands).forEach((cmd) => {
    console.log(`${cmd.name}: ${cmd.description}`);
  });
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
  };
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
