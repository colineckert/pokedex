import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/command.js";

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  // create interface for reading input
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // create commands object
  const commands = getCommands();

  // return the state object
  return {
    commands,
    readline: rl,
  };
}
