/**
 * Converts a hex color to RGB
 * @param {string} hex The hex color
 * @returns The red, green and blue values
 */
export function hexToRgb(hex) {
    const shortHexRegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shortHexRegExp, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) throw Error("A valid HEX must be provided");

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}
