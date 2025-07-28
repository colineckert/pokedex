export function commandHelp(commands) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    Object.values(commands).forEach((cmd) => {
        console.log(`${cmd.name}: ${cmd.description}`);
    });
}
