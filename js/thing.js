import { Circuit } from "./world.js";

class Thing {
    /**
     * Thing constructor
     * @param {Circuit} parent parent world
     */
    constructor(parent) {
        /**
         * Parent world
         * @type {Circuit}
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

        /**
         * Whether the input and output locations change dynamically
         * dependant on the other thing where it's connected to
         * @type {Boolean}
         */
        this.connectionLocationIsDynamic = false;

        /**
         * List of output connections that can be made based on index
         * [[x0, y0], [x1, y1]]
         * @type {Array.<Number[]>}
         */
        this.outputLocationOffset = [];

        /**
         * List of input connections that can be made based on index
         * [[x0, y0], [x1, y1]]
         * @type {Array.<Number[]>}
         */
        this.inputLocationOffset = [];

        this.world.things.push(this);
    }

    /**
     * Thing deconstructor
     */
    _deconstructor() {
        this.world.things.splice(this.world.things.indexOf(this), 1);
    }

    deconstructor() {
        this._deconstructor();
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

    /**
     * Gets position of output of gate
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getOutPos(from, index) {
        return [this.x, this.y];
    }

    /**
     * Gets position of input of gate
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getInPos(from, index) {
        return [this.x, this.y];
    }
}
export {Thing};