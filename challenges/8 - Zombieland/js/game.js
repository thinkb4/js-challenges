import ResourcesService from "./services/resources.service.js";
import CanvasService from "./services/canvas.service.js";
import Player from "./entities/player.js";
import Obstacle from "./entities/obstacle.js";
import ZombieWalker from "./entities/zombie-walker.js";
import ZombieDriver from "./entities/zombie-driver.js";
import Zombie from "./entities/zombie.js";

const spritesBaseUrl = "assets/sprites";
const canvasSize = Object.freeze({ width: 961, height: 577 });
const characterSize = Object.freeze({ width: 18, height: 35 });
const finishLine = Object.freeze({ x: 760, y: 500, width: 126, height: 30 });
const directions = Object.freeze({ left: "left", right: "right", up: "up", down: "down" });
const mappedKeys = Object.freeze({ ArrowLeft: directions.left, ArrowRight: directions.right, ArrowUp: directions.up, ArrowDown: directions.down });
const energyBarHeight = 8;

export default class Game {
    // #region Properties ---------------------

    /**
     * @type {ResourcesService}
     */
    #resourcesService;

    /**
     * @type {CanvasService}
     */
    #canvasService;

    /**
     * @type {Player}
     */
    #player;

    /**
     * @type {Obstacle[]}
     */
    #obstacles;

    /**
     * @type {(ZombieDriver | ZombieWalker)[]}
     */
    #zombies;

    /**
     * @type {HTMLAnchorElement}
     */
    #resetButton;

    // #endregion

    constructor() {
        this.#resetButton = document.querySelector(".reload-btn");
        this.#initialize();
    }

    // #region Base methods -------------------

    /**
     * Initializes the game
     */
    async #initialize() {
        // Initialize resources service and load initial resources
        this.#resourcesService = new ResourcesService();
        await this.#preloadResources();

        // Initialize canvas
        const canvas = document.querySelector("#game-canvas");
        this.#canvasService = new CanvasService(canvas);
        this.#canvasService.init(canvasSize.width, canvasSize.height);

        // Initialize player
        const player = new Player(this.#resourcesService.get("character_down"), 130, 160, characterSize.width, characterSize.height, 10);
        this.#player = player;

        // Set game limits, obstacles and zombies
        this.#setObstacles();
        this.#setZombies();

        // Sets the keydown event listener
        window.addEventListener("keydown", this.#handleKeyDown.bind(this));

        // Starts the game drawing loop
        this.#draw();
    }

    #getGameStatus() {
        return {
            won: this.#player.y + this.#player.height > finishLine.y + finishLine.height && this.#player.x >= finishLine.x,
            lost: this.#player.energy <= 0
        };
    }

    /**
     * Clears the game map
     */
    #clearGameData() {
        this.#obstacles = [];
        this.#zombies = [];
    }

    // #endregion

    // #region UI -----------------------------

    /**
     * Draws all the elements on the canvas
     */
    #draw() {
        const { lost, won } = this.#getGameStatus();

        // this.#canvasService.clear(); // TODO: Canvas should be cleared

        if (!lost && !won) {
            this.#drawBackground("playing");
            this.#drawEntities();
            this.#drawEnergyBar();
            this.#checkZombiesCollisions();
        } else {
            if (lost) this.#drawBackground("lost");
            else if (won) this.#drawBackground("won");

            this.#clearGameData();
            this.#showResetButton();
            window.removeEventListener("keydown", this.#handleKeyDown.bind(this));
        }

        requestAnimationFrame(this.#draw.bind(this));
    }

    /**
     * Draws the background depending on the state
     * @param {"won" | "lost" | "playing"} state The game state
     */
    #drawBackground(state) {
        const gameStates = Object.freeze({ playing: "map", lost: "game_over", won: "splash" });
        const y = state === "playing" ? energyBarHeight : 0;
        this.#canvasService.drawImage(this.#resourcesService.get(gameStates[state]), 0, y, canvasSize.width, canvasSize.height);
    }

    /**
     * Draws all entities
     */
    #drawEntities() {
        const { x, y, width, height } = finishLine;

        this.#canvasService.drawImage(this.#resourcesService.get("finish_line"), x, y, width, height);
        this.#canvasService.drawEntity(this.#player);

        for (const entity of [...this.#obstacles, ...this.#zombies]) {
            this.#canvasService.drawEntity(entity);

            if (entity instanceof Zombie) {
                this.#setZombieSprite(entity);
                entity.move();
            }
        }
    }

    /**
     * Draws the energy bar
     */
    #drawEnergyBar() {
        const progress = canvasSize.width / this.#player.startingEnergy;

        this.#canvasService.drawRect("#fff", 0, 0, canvasSize.width, energyBarHeight);

        for (let i = 0; i < this.#player.energy; i++) {
            this.#canvasService.drawRect("#f00", progress * i, 0, progress, energyBarHeight);
        }
    }

    /**
     * Handles the keydown event
     * @param {Event} e The event
     */
    #handleKeyDown(e) {
        if (!mappedKeys.hasOwnProperty(e.code)) return;

        const currentPosition = Object.seal({ x: 0, y: 0 });
        const direction = mappedKeys[e.code];

        this.#setCharacterSprite(direction);

        switch (direction) {
            case directions.left:
                currentPosition.x = -this.#player.speed;
                break;
            case directions.right:
                currentPosition.x = this.#player.speed;
                break;
            case directions.up:
                currentPosition.y = -this.#player.speed;
                break;
            case directions.down:
                currentPosition.y = this.#player.speed;
                break;
        }

        // TODO: Check this condition to prevent wall crash issue
        if (this.#checkObstaclesCollisions()) this.#player.move(currentPosition.x, currentPosition.y);
    }

    /**
     * Checks collisions against obstacles
     * @returns {boolean} A boolean that determines whether the player can move or not
     */
    #checkObstaclesCollisions() {
        let playerCanMove = true;

        for (const obstacle of this.#obstacles) {
            if (this.#checkPlayerCollisionAgainst(obstacle)) {
                const damage = obstacle.bump();
                this.#player.loseEnergy(damage);
                playerCanMove = false;
            }
        }

        return playerCanMove;
    }

    /**
     * Checks collisions against zombies
     */
    #checkZombiesCollisions() {
        for (const zombie of this.#zombies) {
            if (this.#checkPlayerCollisionAgainst(zombie)) {
                const damage = zombie.startAttacking();
                this.#player.loseEnergy(damage);
            } else {
                zombie.stopAttacking();
            }
        }
    }

    /**
     * Checks collisions between two entities
     * @param {Entity} entity The entity
     * @returns {boolean} A boolean that determines whether the player can move or not
     */
    #checkPlayerCollisionAgainst(entity) {
        const entityRect = { left: entity.x, right: entity.x + entity.width, top: entity.y, bottom: entity.y + entity.height };
        const playerRect = { left: this.#player.x, right: this.#player.x + this.#player.width, top: this.#player.y, bottom: this.#player.y + this.#player.height };
        return entityRect.bottom >= playerRect.top && entityRect.top <= playerRect.bottom && entityRect.right >= playerRect.left && entityRect.left <= playerRect.right;
    }

    /**
     * Sets the character sprite for any given direction
     * @param {("left" | "right" | "up" | "down")} direction The direction
     */
    #setCharacterSprite(direction) {
        this.#player.sprite = this.#resourcesService.get(`character_${direction}`);
        this.#player.width = direction === directions.left || direction === directions.right ? characterSize.height : characterSize.width;
        this.#player.height = direction === directions.left || direction === directions.right ? characterSize.width : characterSize.height;
    }

    /**
     * Changes the zombie sprite in order to simulate a direction change
     * @param {ZombieWalker} zombie
     */
    #setZombieSprite(zombie) {
        if (!(zombie instanceof ZombieWalker)) return;

        if (zombie.x === 0) {
            zombie.sprite = this.#resourcesService.get("zombie_right");
        } else if (zombie.x === canvasSize.width) {
            zombie.sprite = this.#resourcesService.get("zombie_left");
        }
    }

    /**
     * Displays the reset button
     */
    #showResetButton() {
        this.#resetButton.classList.remove("hidden");
    }

    // #endregion

    // #region Resources ----------------------

    /**
     * Sets the obstacles
     */
    #setObstacles() {
        this.#obstacles = [
            // Borders
            new Obstacle("", 0, 5, 961, 18, 0),
            new Obstacle("", 0, 559, 961, 18, 0),
            new Obstacle("", 0, 5, 18, 572, 0),
            new Obstacle("", 943, 5, 18, 572, 0),
            // Sidewalks
            new Obstacle("", 18, 23, 51, 536, 1),
            new Obstacle("", 69, 507, 690, 52, 1),
            new Obstacle("", 587, 147, 173, 360, 1),
            new Obstacle("", 346, 147, 241, 52, 1),
            new Obstacle("", 196, 267, 263, 112, 1),
            new Obstacle("", 196, 23, 83, 244, 1),
            new Obstacle("", 279, 23, 664, 56, 1),
            new Obstacle("", 887, 79, 56, 480, 1),
            // Route obstacles
            new Obstacle(this.#resourcesService.get("bags"), 180, 460, 30, 30, 1),
            new Obstacle(this.#resourcesService.get("bags_horizontal"), 80, 450, 100, 30, 1),
            new Obstacle(this.#resourcesService.get("bags_circular"), 520, 440, 80, 83, 1),
            new Obstacle(this.#resourcesService.get("bags_vertical"), 850, 150, 30, 90, 1),
            new Obstacle(this.#resourcesService.get("dead_1"), 120, 475, 35, 22, 1),
            new Obstacle(this.#resourcesService.get("dead_2"), 850, 430, 35, 24, 1),
            new Obstacle(this.#resourcesService.get("bump_1"), 160, 290, 25, 25, 1),
            new Obstacle(this.#resourcesService.get("bump_1"), 770, 430, 25, 25, 1),
            new Obstacle(this.#resourcesService.get("bump_2"), 340, 470, 25, 25, 1),
            new Obstacle(this.#resourcesService.get("blood_1"), 365, 490, 25, 25, 1),
            new Obstacle(this.#resourcesService.get("blood_2"), 550, 470, 32, 33, 1),
            new Obstacle(this.#resourcesService.get("blood_2"), 530, 70, 30, 30, 1),
            new Obstacle(this.#resourcesService.get("yellow_car_1"), 270, 240, 38, 20, 1),
            new Obstacle(this.#resourcesService.get("yellow_car_2"), 380, 370, 30, 30, 1),
            new Obstacle(this.#resourcesService.get("light_blue_car"), 500, 60, 30, 30, 1)
        ];
    }

    /**
     * Sets the zombies
     */
    #setZombies() {
        const { width, height } = canvasSize;

        this.#zombies = [
            new ZombieWalker(this.#resourcesService.get("zombie_left"), 500, 100, 20, 12, 1, { from: { x: 0, y: 0 }, to: { x: width, y: height } }),
            new ZombieWalker(this.#resourcesService.get("zombie_left"), 850, 150, 20, 12, 1, { from: { x: 0, y: 0 }, to: { x: width, y: height } }),
            new ZombieWalker(this.#resourcesService.get("zombie_left"), 250, 250, 20, 12, 1, { from: { x: 0, y: 0 }, to: { x: width, y: height } }),
            new ZombieWalker(this.#resourcesService.get("zombie_left"), 550, 400, 20, 13, 1, { from: { x: 0, y: 0 }, to: { x: width, y: height } }),
            new ZombieWalker(this.#resourcesService.get("zombie_left"), 750, 440, 20, 12, 1, { from: { x: 0, y: 0 }, to: { x: width, y: height } }),
            new ZombieDriver(this.#resourcesService.get("train_vertical"), 674, 320, 30, 90, 10, { from: { x: 0, y: -15 }, to: { x: width, y: height } }, "vertical"),
            new ZombieDriver(this.#resourcesService.get("train_vertical"), 644, 0, 30, 90, 8, { from: { x: 0, y: -15 }, to: { x: width, y: height } }, "vertical"),
            new ZombieDriver(this.#resourcesService.get("train_horizontal"), 400, 325, 90, 30, 10, { from: { x: 0, y: 0 }, to: { x: width, y: height } }, "horizontal")
        ];
    }

    /**
     * Preloads all of the resources
     */
    async #preloadResources() {
        await this.#resourcesService.load([
            `${spritesBaseUrl}/map.png`,
            `${spritesBaseUrl}/game_over.png`,
            `${spritesBaseUrl}/splash.png`,
            `${spritesBaseUrl}/bump_1.png`,
            `${spritesBaseUrl}/bump_2.png`,
            `${spritesBaseUrl}/blood_1.png`,
            `${spritesBaseUrl}/blood_2.png`,
            `${spritesBaseUrl}/train_vertical.png`,
            `${spritesBaseUrl}/train_horizontal.png`,
            `${spritesBaseUrl}/bags.png`,
            `${spritesBaseUrl}/bags_horizontal.png`,
            `${spritesBaseUrl}/bags_vertical.png`,
            `${spritesBaseUrl}/bags_circular.png`,
            `${spritesBaseUrl}/zombie_right.png`,
            `${spritesBaseUrl}/zombie_left.png`,
            `${spritesBaseUrl}/dead_1.png`,
            `${spritesBaseUrl}/dead_2.png`,
            `${spritesBaseUrl}/empty.png`,
            `${spritesBaseUrl}/character_down.png`,
            `${spritesBaseUrl}/character_up.png`,
            `${spritesBaseUrl}/character_right.png`,
            `${spritesBaseUrl}/character_left.png`,
            `${spritesBaseUrl}/yellow_car_1.png`,
            `${spritesBaseUrl}/yellow_car_2.png`,
            `${spritesBaseUrl}/pink_car.png`,
            `${spritesBaseUrl}/light_blue_car.png`,
            `${spritesBaseUrl}/finish_line.png`
        ]);
    }

    // #endregion
}
