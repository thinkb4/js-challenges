import Zombie from './zombie.js';

export default class ZombieWalker extends Zombie {
	/**
	 * Instantiates a ZombieWalker
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the zombie
	 * @param {number} y The Y position of the zombie
	 * @param {number} width The width of the zombie
	 * @param {number} height The height of the zombie
	 * @param {number} speed The speed of the zombie
	 * @param {ZombieMovementRange} movementRange The movement range of the zombie
	 */
	constructor(sprite, x, y, width, height, speed, movementRange) {
		super(sprite, x, y, width, height, speed, movementRange);
	}

	/**
	 * Moves the zombie around
	 */
	move() {
		const { from, to } = this.movementRange;

		this.x -= this.speed;
		this.y += Math.random() < 0.5 ? this.speed * -1 : this.speed;

		if (this.x < from.x || this.x > to.x) {
			this.speed *= -1;
		}

		if (this.y < from.y || this.y > to.y) {
			this.y = from.y + (to.y - from.y) / 2;
		}
	}
}
