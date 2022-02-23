export class Entity {
	/**
	 * Instantiates an Entity
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the character
	 * @param {number} y The Y position of the character
	 * @param {number} width The width of the character
	 * @param {number} height The height of the character
	 */
	constructor(sprite, x, y, width, height) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

export class MovableEntity extends Entity {
	/**
	 * Instantiates a MovableEntity
	 * @param {string} sprite The sprite
	 * @param {number} x The X position of the character
	 * @param {number} y The Y position of the character
	 * @param {number} width The width of the character
	 * @param {number} height The height of the character
	 * @param {number} speed The speed of the character
	 */
	constructor(sprite, x, y, width, height, speed) {
		super(sprite, x, y, width, height);
		this.speed = speed;
	}
}
