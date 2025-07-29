import { createInterface } from "readline";
import { getCommands } from "./commands/command.js";
export function initState() {
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
