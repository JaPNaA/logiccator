import { LogicGate } from "./logicGate.js";
import { World } from "./world.js";
import { Thing } from "./thing.js";

class Wire extends Thing {
    /**
     * Input constructor
     * @param {World} world parent world
     */
    constructor(world) {
        super(world);

        /**
         * input logic gate
         * @type {LogicGate}
         */
        this.gateIn = null;

        /**
         * input logic gate index
         * @type {Number}
         */
        this.gateInIndex = 0;

        /**
         * output logic gate
         * @type {LogicGate}
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
     * @param {LogicGate} gate input gate
     * @param {Number} index index of input of gate
     */
    setIn(gate, index) {
        this.gateIn = gate;
        this.gateInIndex = index;
        this.validate();
    }

    /**
     * Set output gate
     * @param {LogicGate} gate output gate
     * @param {Number} index index of output of gate
     */
    setOut(gate, index) {
        this.gateOut = gate;
        this.gateOutIndex = index;
        this.validate();
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
     * Updates all children recursively
     */
    update() {
        this.gateIn.update();
    }

    /**
     * draws the wire
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        X.beginPath();
        X.moveTo(this.gateIn.x, this.gateIn.y);
        X.lineTo(this.gateOut.x, this.gateOut.y);
        X.lineWidth = 2;
        X.strokeStyle = "#000";
        X.stroke();
    }
}

export { Wire };