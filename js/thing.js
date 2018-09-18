import { World } from "./world.js";

class Thing {
    /**
     * Thing constructor
     * @param {World} parent parent world
     */
    constructor(parent) {
        /**
         * Parent world
         * @type {World}
         */
        this.world = parent;

        /**
         * Center X
         * @type {Number}
         */
        this.x = 0;

        /**
         * Center X
         * @type {Number}
         */
        this.y = 0;

        /** 
         * Width of thing
         * @type {Number}
         */
        this.width = 0;

        /**
         * Height of thing
         * @type {Number}
         */
        this.height = 0;
    }

    /**
     * draw the thing
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        /**
         * Top left x
         * @type {Number}
         */
        const x = this.x - this.width / 2;

        /**
         * Top left y
         * @type {Number}
         */
        const y = this.y - this.height / 2;

        X.fillStyle = "#F00"; //* temp
        X.fillRect(x, y, this.width, this.height);
    }
}
export {Thing};