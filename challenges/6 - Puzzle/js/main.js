import { puzzles } from "./puzzles.js";
import { isSorted, shuffleArray } from "./helpers.js";

const puzzlesSelect = document.querySelector("#puzzles-select");
const puzzleContainer = document.querySelector("#puzzle");
const configuration = Object.freeze({
    grid: 3,
    startedClassName: "started",
    finishedClassName: "finished"
});
let draggedPiece;
let pieceNewPosition;

/**
 * Set the puzzles selector options
 */
function setPuzzlesSelectOptions() {
    for (const puzzle of puzzles) {
        const option = document.createElement("option");
        option.value = puzzle.name;
        option.textContent = puzzle.name;
        puzzlesSelect.append(option);
    }
}

/**
 * Sets the puzzle grid custom properties
 */
function setPuzzleConfiguration() {
    puzzleContainer.style.setProperty("--puzzle-columns", configuration.grid);
    puzzleContainer.style.setProperty("--puzzle-rows", configuration.grid);
    puzzleContainer.addEventListener("dragover", handlePieceDragOver);
    puzzleContainer.addEventListener("dragend", handlePieceDragEnd);
}

/**
 * Gets the pieces from an image
 * @param {HTMLImageElement} image The image
 * @returns The array of pieces
 */
function getPiecesFromImage(image) {
    const piecesSize = image.width / configuration.grid;
    const pieces = [];
    let counter = 0;

    for (let y = 0; y < configuration.grid; ++y) {
        for (let x = 0; x < configuration.grid; ++x) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = piecesSize;
            canvas.height = piecesSize;
            context.drawImage(
                image,
                x * piecesSize,
                y * piecesSize,
                piecesSize,
                piecesSize,
                0,
                0,
                canvas.width,
                canvas.height
            );

            pieces.push({
                id: ++counter,
                image: canvas.toDataURL()
            });
        }
    }

    return pieces;
}

/**
 * Generates the puzzle from an array of pieces
 * @param {string[]} pieces The puzzle pieces
 */
function generatePuzzlePieces(pieces) {
    puzzleContainer.innerHTML = "";

    for (const piece of pieces) {
        const img = document.createElement("img");
        img.dataset.order = piece.id;
        img.src = piece.image;
        img.draggable = true;
        img.addEventListener("dragstart", handlePieceDragStart);
        puzzleContainer.append(img);
    }
}

/**
 * Sets the puzzle from an image URL
 * @param {string} url The image URL
 */
function setPuzzlePieces(url) {
    const image = new Image();
    image.src = url;
    image.onload = e => {
        const pieces = getPiecesFromImage(e.target);
        const shuffledPieces = shuffleArray(pieces);
        generatePuzzlePieces(shuffledPieces);
    };
}

/**
 * Checks if the puzzle was finished
 */
function checkFinishedPuzzle() {
    const pieces = puzzleContainer.querySelectorAll("img");
    const piecesIds = [...pieces].reduce((acc, val) => {
        acc.push(+val.dataset.order);
        return acc;
    }, []);
    const piecesAreSorted = isSorted(piecesIds);

    if (piecesAreSorted) {
        document.body.classList.add(configuration.finishedClassName);

        setTimeout(() => {
            document.body.classList.remove(configuration.startedClassName);
            document.body.classList.remove(configuration.finishedClassName);
        }, 2000);
    }
}

/**
 * Handles the puzzle selection
 * @param {Event} e The event
 */
function handlePuzzleSelection(e) {
    const puzzle = puzzles.find(x => x.name === e.target.value);
    setPuzzlePieces(puzzle.image);
    document.body.classList.add(configuration.startedClassName);
}

/**
 * Handles the drag start event
 * @param {Event} e The event
 */
function handlePieceDragStart(e) {
    draggedPiece = e.target;
}

/**
 * Handles the drag over event
 * @param {Event} e The event
 */
function handlePieceDragOver(e) {
    pieceNewPosition = e.target;
}

/**
 * Handles the drag end event
 * @param {Event} e The event
 */
function handlePieceDragEnd() {
    const clone = draggedPiece.cloneNode(true);

    clone.addEventListener("dragstart", handlePieceDragStart);
    puzzleContainer.insertBefore(clone, pieceNewPosition);
    puzzleContainer.insertBefore(pieceNewPosition, draggedPiece);
    draggedPiece.remove();
    checkFinishedPuzzle();
}

/**
 * Initializes the game
 */
function init() {
    if (document.body.classList.contains(configuration.finishedClassName))
        document.body.classList.remove(configuration.finishedClassName);

    puzzlesSelect.addEventListener("change", handlePuzzleSelection);
    setPuzzlesSelectOptions();
    setPuzzleConfiguration();
}

init();
