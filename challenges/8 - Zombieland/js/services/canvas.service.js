export default class CanvasService {
	/**
	 * @type {HTMLCanvasElement}
	 */
	#canvas;

	/**
	 * @type {CanvasRenderingContext2D}
	 */
	#ctx;

	/**
	 * The canvas service
	 * @param {HTMLCanvasElement} canvas The canvas
	 */
	constructor(canvas) {
		this.#canvas = canvas;
		this.#ctx = canvas.getContext('2d');
	}

	/**
	 * Initializes the canvas
	 * @param {number} width The canvas width
	 * @param {number} height The canvas height
	 */
	init(width, height) {
		this.#canvas.width = width;
		this.#canvas.height = height;
	}

	/**
	 * Clears the canvas
	 */
	clear() {
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
	}

	/**
	 * Draws an image on the canvas
	 * @param {string} url The image
	 * @param {number} x The image X position
	 * @param {number} y The image Y position
	 * @param {number} width The image width
	 * @param {number} height The image height
	 */
	drawImage(url, x, y, width, height) {
		const image = new Image();
		image.onload = () => this.#ctx.drawImage(image, x, y, width, height);
		image.src = url;
	}

	/**
	 * Draws a rectangle on the canvas
	 * @param {string} color The rectangle color
	 * @param {number} x The rectangle X position
	 * @param {number} y The rectangle Y position
	 * @param {number} width The rectangle width
	 * @param {number} height The rectangle height
	 */
	drawRect(color, x, y, width, height) {
		this.#ctx.fillStyle = color;
		this.#ctx.fillRect(x, y, width, height);
	}

	/**
	 * Draws an entity on the canvas
	 * @param {Entity} entity The entity
	 */
	drawEntity(entity) {
		const { sprite, x, y, width, height } = entity;
		this.drawImage(sprite, x, y, width, height);
	}
}
