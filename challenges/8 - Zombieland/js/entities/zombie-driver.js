import Zombie from './zombie.js';

export default class ZombieDriver extends Zombie {
	/**
	 * Instantiates a ZombieDriver
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the zombie
	 * @param {number} y The Y position of the zombie
	 * @param {number} width The width of the zombie
	 * @param {number} height The height of the zombie
	 * @param {number} speed The speed of the zombie
	 * @param {ZombieMovementRange} movementRange The movement range of the zombie
	 * @param {"horizontal" | "vertical"} direction The movement direction of the zombie
	 */
	constructor(sprite, x, y, width, height, speed, movementRange, direction) {
		super(sprite, x, y, width, height, speed, movementRange);
		this.direction = direction;
	}

	/**
	 * Moves the zombie around
	 */
	move() {
		switch (this.direction) {
			case 'vertical':
				this.y -= this.speed;

				if (this.y < this.movementRange.from.y || this.y > this.movementRange.to.y) {
					this.speed *= -1;
				}

				break;

			case 'horizontal':
				this.x -= this.speed;

				if (this.x < this.movementRange.from.x || this.x > this.movementRange.to.x) {
					this.speed *= -1;
				}

				break;
		}
	}
}
