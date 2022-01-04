/**
 * The available filters
 * @type {Filter[]}
 */
const filters = Object.freeze([
    { id: "brightness", label: "Brightness", defaultValue: 10, min: 1, max: 110 },
    { id: "contrast", label: "Contrast", defaultValue: 10, min: 1, max: 100 },
    { id: "hue-rotate", label: "HUE Rotate", defaultValue: 10, min: 1, max: 360, unit: "deg" },
    { id: "grayscale", label: "Grayscale", defaultValue: 1, min: 0, max: 1 },
    { id: "sepia", label: "Sepia", defaultValue: 1, min: 0, max: 1 },
    { id: "invert", label: "Invert", defaultValue: 1 },
    { id: "saturate", label: "Saturate", defaultValue: 5, min: 1, max: 100 },
    { id: "blur", label: "Blur", defaultValue: 1, min: 0, max: 10, unit: "px" }
]);

export default filters;
