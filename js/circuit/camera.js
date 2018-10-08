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
        this.circuit.app.requestRender();
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
        this.circuit.app.requestRender();
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
        this.x += e.movementX;
        this.y += e.movementY;
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
}

export { Camera };