import { MovableEntity } from './entity.js';

export default class Zombie extends MovableEntity {
	/**
	 * @type {boolean}
	 */
	#isAttacking = false;

	/**
	 * Instantiates a Zombie
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the zombie
	 * @param {number} y The Y position of the zombie
	 * @param {number} width The width of the zombie
	 * @param {number} height The height of the zombie
	 * @param {number} speed The speed of the zombie
	 * @param {ZombieMovementRange} movementRange The movement range of the zombie
	 * @param {number} damagePower The damage power of the zombie
	 */
	constructor(sprite, x, y, width, height, speed, movementRange, damagePower) {
		super(sprite, x, y, width, height, speed);
		this.movementRange = movementRange;
		this.damagePower = damagePower ?? 1;
	}

	/**
	 * Starts an attack
	 * @returns {number | void} The amount of damage the zombie can make
	 */
	startAttacking() {
		if (!this.#isAttacking) return this.damagePower;
		this.#isAttacking = true;
	}

	/**
	 * Stops an attack
	 */
	stopAttacking() {
		this.#isAttacking = false;
	}
}
