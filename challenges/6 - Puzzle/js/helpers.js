/**
 * Randomizes an array in-place using Durstenfeld shuffle algorithm
 * @param {any[]} array The target array
 * @returns The randomized array
 * @see {@link [Reference](https://medium.com/@anthonyfuentes/do-the-shuffle-the-durstenfeld-shuffle-7920c2ce0c45)}
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }

    return array;
}

/**
 * Checks if an array is sorted
 * @param {any[]} array The target array
 * @returns A boolean that determines whether the array is sorted or not
 */
export function isSorted(array) {
    return array.every((v, i, a) => !i || a[i - 1] <= v);
}
