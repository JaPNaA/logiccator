import { Circuit } from "./circuit.js";
import { Camera } from "./camera.js";

class Thing {
    /**
     * Thing constructor
     * @param {Circuit} parent parent circuit
     */
    constructor(parent) {
        /**
         * Parent circuit
         * @type {Circuit}
         */
        this.circuit = parent;

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
         * Is the X position of the thing fixed?
         * @type {Boolean}
         */
        this.fixedPositionX = false;

        /**
         * Is the Y position of the thing fixed?
         * @type {Boolean}
         */
        this.fixedPositionY = false;

        /**
         * Is the size of the thing fixed?
         */
        this.fixedScale = false;

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

        // setup
        // -----------------------------------------------------------------------------
        if (this.circuit.ready) {
            this.circuit.app.ui.updateStructWidgets();
        }

        this.circuit.things.push(this);
    }

    /**
     * Thing deconstructor
     */
    _deconstructor() {
        this.circuit.things.splice(this.circuit.things.indexOf(this), 1);
    }

    deconstructor() {
        this._deconstructor();
    }

    /**
     * draw the thing
     * @param {CanvasRenderingContext2D} X rendering context
     * @param {Camera} camera camera
     */
    draw(X, camera) {
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

        camera.transformTo(X, this);

        X.fillStyle = "#F00"; //* temp
        X.fillRect(x, y, this.width, this.height);

        camera.resetTransform(X);
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

    /**
     * Mousemove event handler
     * @param {MouseEvent} e event information
     */
    onmousemove(e) { }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    onmousedown(e) { }

    /**
     * Mouseup event handler
     * @param {MouseEvent} e event information
     */
    onmouseup(e) { }
}
export { Thing };