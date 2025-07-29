import type { State } from "src/state.js";

export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  Object.values(state.commands).forEach((cmd) => {
    console.log(`${cmd.name}: ${cmd.description}`);
  });
}
