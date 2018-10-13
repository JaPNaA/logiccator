import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";

/**
 * Offsets, scales, etc.
 */
class Camera {
    /**
     * Camera constructor
     * @param {Circuit} circuit parent circuit
     */
    constructor(circuit) {
        /**
         * parent circuit
         * @type {Circuit}
         */
        this.circuit = circuit;

        /**
         * Offset X
         * @type {Number}
         * @private
         */
        this._x = 0;

        /**
         * Offset Y
         * @type {Number}
         * @private
         */
        this._y = 0;

        /**
         * Scale of camera
         * @type {Number}
         */
        this.scale = 0;

        /**
         * Is the user manipulating the camera with mouse?
         * @type {Boolean}
         */
        this.userActive = false;

        /** 
         * Events
         */
        this.events = {
            /**
             * Camera move handlers
             * @type {Function[]}
             */
            move: []
        };

        this.setup();
    }

    setup() {
        this.onmousemove = this.onmousemove.bind(this);
        this.onmousedown = this.onmousedown.bind(this);
        this.onmouseup = this.onmouseup.bind(this);
        
        this.circuit.addEventListener("mousemove", this.onmousemove);
        this.circuit.addEventListener("mousedown", this.onmousedown);
        this.circuit.addEventListener("mouseup", this.onmouseup);
    }

    /**
     * Offset x
     * @return {Number} offset x
     */
    get x() {
        return this._x;
    }
    set x(e) {
        this._x = e;
        this.onmove();
    }

    /**
     * Offset y
     * @return {Number} offset y
     */
    get y() {
        return this._y;
    }
    set y(e) {
        this._y = e;
        this.onmove();
    }

    /**
     * Set camera position
     * @param {Number} x position
     * @param {Number} y position
     */
    set(x, y) {
        this._x = x;
        this._y = y;
        this.onmove();
    }

    /**
     * Move camera by
     * @param {Number} x offset
     * @param {Number} y offset
     */
    moveBy(x, y) {
        this._x += x;
        this._y += y;
        this.onmove();
    }

    /**
     * Transforms canvas to camera
     * @param {CanvasRenderingContext2D} X context
     * @param {Thing} thing thing to translate for
     */
    transformTo(X, thing) {
        const tx = thing.fixedPositionX ? 0 : this.x;
        const ty = thing.fixedPositionY ? 0 : this.y;

        X.translate(tx, ty);

        if (thing.fixedScale) {
            X.scale(this.scale, this.scale);
        }
    }

    /**
     * Reset transform of X
     * @param {CanvasRenderingContext2D} X rendering context
     */
    resetTransform(X) {
        // @ts-ignore
        X.resetTransform();
    }

    /**
     * Mousemove handler
     * @param {MouseEvent} e event data
     */
    onmousemove(e) {
        if (!this.userActive) return;
        this.moveBy(e.movementX, e.movementY);
    }

    /**
     * Adds event listener
     * @param {"move"} name name of event
     * @param {Function} handler function to handle event
     */
    addEventListener(name, handler) {
        this.events[name].push(handler);
    }

    /**
     * Removes event listener
     * @param {"move"} name name of event
     * @param {Function} handler function handling event
     */
    removeEventListener(name, handler) {
        let handlerList = this.events[name];
        handlerList.splice(handlerList.indexOf(handler), 1);
    }

    /**
     * Mousedown handler
     * @param {MouseEvent} e event data
     */
    onmousedown(e) {
        this.userActive = true;
    }

    /**
     * Mouseup handler
     * @param {MouseEvent} e event data
     */
    onmouseup(e) {
        this.userActive = false;
    }

    /**
     * Move handler
     */
    onmove() {
        for (let handler of this.events.move) {
            handler();
        }

        this.circuit.app.requestRender();
    }
}

export { Camera };