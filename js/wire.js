import { Abstract } from "./logicGate.js";
import { Circuit } from "./world.js";
import { Thing } from "./thing.js";

class Wire extends Thing {
    /**
     * Input constructor
     * @param {Circuit} world parent world
     */
    constructor(world) {
        super(world);

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
     */
    setIn(gate, index) {
        this.gateIn = gate;
        this.gateInIndex = index;
        this.validate();
    }

    /**
     * Set output gate
     * @param {Abstract} gate output gate
     * @param {Number} index index of output of gate
     */
    setOut(gate, index) {
        this.gateOut = gate;
        this.gateOutIndex = index;
        this.validate();

        gate.inputWires[index] = this;
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
        if (this.gateIn) {
            this.gateIn.backProp();
        } else {
            throw new Error("Wire not attached to anything else");
        }
    }

    /**
     * draws the wire
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        const [inX, inY] = this.gateIn.getOutPos(this.gateOut, this.gateOutIndex);
        const [outX, outY] = this.gateOut.getInPos(this.gateIn, this.gateOutIndex);

        X.beginPath();
        X.moveTo(inX, inY);
        X.lineTo(outX, outY);
        X.lineWidth = 2;
        X.strokeStyle = "#000";
        X.stroke();
    }
}

export { Wire };