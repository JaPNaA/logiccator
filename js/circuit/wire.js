import { Abstract } from "./logicGate.js";
import { Circuit } from "./circuit.js";
import { Thing } from "./thing.js";
import { Camera } from "./camera.js";

class Wire extends Thing {
    /**
     * Input constructor
     * @param {Circuit} circuit parent circuit
     */
    constructor(circuit) {
        super(circuit);

        /**
         * input logic gate
         * @type {Abstract}
         */
        this.gateIn = null;

        /**
         * input logic gate index
         * @type {Number}
         */
        this.gateInIndex = 0;

        /**
         * output logic gate
         * @type {Abstract}
         */
        this.gateOut = null;

        /**
         * output logic gate index
         * @type {Number}
         */
        this.gateOutIndex = 0;

        /**
         * Can this wire transmit data?
         * @type {Boolean}
         */
        this.valid = false;
    }

    /**
     * Set input gate
     * @param {Abstract} gate input gate
     * @param {Number} index index of input of gate
     * @returns {Number} index of gate wire connected to
     */
    setIn(gate, index) {
        return gate.setOut(this, index);
    }

    /**
     * Set output gate
     * @param {Abstract} gate output gate
     * @param {Number} index index of output of gate
     * @returns {Number} index of gate wire connected to
     */
    setOut(gate, index) {
        return gate.setIn(this, index);
    }

    /**
     * Gets the state of the input
     * @return {Number} state of input
     */
    getState() {
        return this.gateIn.outputs[this.gateInIndex];
    }

    /**
     * Validates the wire, called every time input or
     * output gates are changed
     */
    validate() {
        let valid = true;

        if (
            this.gateInIndex < 0 &&
            this.gateInIndex >= this.gateIn.outputLength &&
            !Number.isInteger(this.gateInIndex)
        ) {
            valid = false;
        }

        if (
            this.gateOutIndex < 0 &&
            this.gateOutIndex >= this.gateOut.outputLength &&
            !Number.isInteger(this.gateOutIndex)
        ) {
            valid = false;
        }

        this.valid = valid;
    }

    /**
     * Updates all input gates recursively
     */
    backProp() {
        if (this.gateIn) {
            this.gateIn.backProp();
        } else {
            throw new Error("No inputs attached to wire");
        }
    }

    /**
     * Updates all output gates recursively
     */
    forwardProp() {
        if (this.gateOut) {
            this.gateOut.forwardProp();
        } else {
            throw new Error("No outputs attached to wire");
        }
    }

    /**
     * draws the wire
     * @param {CanvasRenderingContext2D} X rendering context
     * @param {Camera} camera camera
     */
    draw(X, camera) {
        const [inX, inY] = this.gateIn.getOutPos(this.gateOut, this.gateOutIndex);
        const [outX, outY] = this.gateOut.getInPos(this.gateIn, this.gateOutIndex);

        camera.transformTo(X, this);

        X.beginPath();
        X.moveTo(inX, inY);
        X.lineTo(outX, outY);
        X.lineWidth = 2;
        X.strokeStyle = "#000";
        X.stroke();

        camera.resetTransform(X);
    }
}

export { Wire };