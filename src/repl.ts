import { createInterface } from "readline";

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

    switch (args[0]) {
      case "exit":
        rl.close();
        break;
      case "help":
        console.log("Available commands: exit, help");
        break;
      default:
        console.log(`Your command was: ${args[0]}`);
    }

    // display prompt again
    rl.prompt();
  });
}
