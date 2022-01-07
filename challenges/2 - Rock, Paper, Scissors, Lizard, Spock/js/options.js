export const optionsMap = Object.freeze({
    rock: {
        scissors: { description: "Rock crushes scissors" },
        lizard: { description: "Rock crushes lizard" }
    },
    paper: {
        rock: { description: "Paper covers rock" },
        spock: { description: "Paper disproves Spock" }
    },
    scissors: {
        paper: { description: "Scissors cuts paper" },
        lizard: { description: "Scissors decapitates lizard" }
    },
    lizard: {
        paper: { description: "Lizard eats paper" },
        spock: { description: "Lizard poisons Spock" }
    },
    spock: {
        rock: { description: "Spock vaporizes rock" },
        scissors: { description: "Spock smashes scissors" }
    }
});
