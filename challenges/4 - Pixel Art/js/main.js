import { hexToRgb } from "./helpers.js";

const grid = document.querySelector("#grid");
const colorInput = document.querySelector("#color-input");
const colorIntensity = document.querySelector("#color-intensity");
const pixelSizeInput = document.querySelector("#pixel-size");
const configuration = Object.seal({
    pixelSize: 30,
    color: colorInput.value,
    colorIntensity: 1,
    painting: false
});

let pixelSizeChangeTimeout;

/**
 * Sets the pixel grid based on the pixel size configuration
 */
function setPixelGrid() {
    const { pixelSize } = configuration;

    grid.innerHTML = "";
    grid.style.setProperty("--pixel-size", pixelSize);

    for (let i = 0; i < pixelSize * pixelSize; i++) {
        const div = document.createElement("div");
        grid.append(div);
    }
}

/**
 * Paints any given target with the selected color
 * @param {HTMLElement} target The target element
 */
function paint(target) {
    if (!grid.contains(target)) return;

    const { color, colorIntensity } = configuration;
    const { r, g, b } = hexToRgb(color);
    target.style.backgroundColor = `rgba(${[r, g, b, colorIntensity].join(",")})`;
}

/**
 * Handles the color change event
 * @param {Event} e The event
 */
function handleColorChange(e) {
    configuration.color = e.target.value;
}

/**
 * Handles the intensity change event
 * @param {Event} e The event
 */
function handleIntensityChange(e) {
    configuration.colorIntensity = e.target.value;
}

/**
 * Handles the pixel size change event using a debounce to prevent performance issues
 * @param {Event} e The event
 */
function handlePixelSizeChange(e) {
    clearTimeout(pixelSizeChangeTimeout);

    pixelSizeChangeTimeout = setTimeout(() => {
        configuration.pixelSize = e.target.value;
        setPixelGrid();
    }, 250);
}

/**
 * Handles the pointer down event
 * @param {Event} e The event
 */
function handlePointerDown(e) {
    configuration.painting = true;
    paint(e.target);
}

/**
 * Handles the pointer up event
 */
function handlePointerUp() {
    configuration.painting = false;
}

/**
 * Handles the pointer move event
 */
function handlePointerMove(e) {
    if (configuration.painting) paint(e.target);
}

/**
 * Initializes the app
 */
function init() {
    // Configuration listeners
    colorInput.addEventListener("change", handleColorChange);
    colorIntensity.addEventListener("change", handleIntensityChange);
    pixelSizeInput.addEventListener("change", handlePixelSizeChange);

    // Global listeners
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);

    // Initial configuration
    pixelSizeInput.value = configuration.pixelSize;
    setPixelGrid();
}

init();
