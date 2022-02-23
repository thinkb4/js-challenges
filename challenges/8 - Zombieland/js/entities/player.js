import { MovableEntity } from './entity.js';

export default class Player extends MovableEntity {
	/**
	 * @type {number}
	 */
	#startingEnergy = 20;

	#energy = this.#startingEnergy;

	/**
	 * Gets the player starting energy
	 * @returns {number}
	 */
	get startingEnergy() {
		return this.#startingEnergy;
	}

	/**
	 * Gets the player energy
	 * @returns {number}
	 */
	get energy() {
		return this.#energy;
	}

	/**
	 * Instantiates a Player
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the player
	 * @param {number} y The Y position of the player
	 * @param {number} width The width of the player
	 * @param {number} height The height of the player
	 * @param {number} speed The speed of the player
	 */
	constructor(sprite, x, y, width, height, speed) {
		super(sprite, x, y, width, height, speed);
	}

	/**
	 * Moves the player around
	 * @param {number} x The X position
	 * @param {number} y The Y position
	 */
	move(x, y) {
		this.x += x;
		this.y += y;
	}

	/**
	 * Lowers the player's energy
	 * @param {number} energy The energy amount
	 */
	loseEnergy(energy) {
		this.#energy -= energy;
	}
}
