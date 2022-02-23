import { Entity } from './entity.js';

export default class Obstacle extends Entity {
	/**
	 * Instantiates an Obstacle
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the obstacle
	 * @param {number} y The Y position of the obstacle
	 * @param {number} width The width of the obstacle
	 * @param {number} height The height of the obstacle
	 * @param {number} damagePower The power of the obstacle
	 */
	constructor(sprite, x, y, width, height, damagePower) {
		super(sprite, x, y, width, height);
		this.damagePower = damagePower;
	}

	/**
	 * Bumps against a target
	 * @returns {number} The damage power of the obstacle
	 */
	bump() {
		const power = this.damagePower;
		this.damagePower = 0;
		return power;
	}
}
