import "./types.js";
import { optionsMap } from "./options.js";

const optionButtons = document.querySelectorAll(".option");
const gameOverPopup = {
    container: document.querySelector(".game-over-container"),
    title: document.querySelector(".game-over-message h1"),
    description: document.querySelector(".game-over-message h2"),
    closeButton: document.querySelector(".game-over-message button")
};

/**
 * Gets a random option from the options map
 * @returns The option
 */
function getOpponentOption() {
    const possibleOptions = Object.keys(optionsMap);
    const random = Math.floor(Math.random() * possibleOptions.length);
    return possibleOptions[random];
}

/**
 * Sets the game over message
 * @param {GameResult} result The game result
 * @returns {GameOverMessage} The game over message
 */
function getGameOverMessage(result) {
    return {
        title: `You <span>${result.playerOption ? "win" : "lose"}</span>
                Player selected: <b>${result.playerOption}</b>
                Opponent selected: <b>${result.opponentOption}</b>`,
        description:
            result.description ?? optionsMap[result.opponentOption][result.playerOption].description
    };
}

/**
 * Open or closes the game over popup
 * @param {boolean} open The boolean that determines if the popup opens or closes
 */
function toggleGameOverMessagePopup(open) {
    gameOverPopup.container.classList[open ? "add" : "remove"]("visible");
}

/**
 * Selects on of the available options
 * @param {Event} e The event
 */
function selectOption(e) {
    const playerOption = e.currentTarget.value;
    const opponentOption = getOpponentOption();

    if (playerOption !== opponentOption) {
        const winnerResult = optionsMap[playerOption][opponentOption];
        const { title, description } = getGameOverMessage({
            playerWins: !!winnerResult,
            playerOption: playerOption,
            opponentOption: opponentOption,
            description: winnerResult?.description
        });

        gameOverPopup.container.classList.remove(!winnerResult ? "win" : "lose");
        gameOverPopup.container.classList.add(winnerResult ? "win" : "lose");
        gameOverPopup.title.innerHTML = title;
        gameOverPopup.description.innerHTML = description;
    } else {
        gameOverPopup.title.innerHTML = "It's a tie!";
        gameOverPopup.description.innerHTML = "";
    }

    toggleGameOverMessagePopup(true);
}

/**
 * Initializes the app
 */
function init() {
    gameOverPopup.closeButton.addEventListener("click", () => toggleGameOverMessagePopup(false));

    for (const button of optionButtons) {
        button.addEventListener("click", selectOption);
    }
}

init();
