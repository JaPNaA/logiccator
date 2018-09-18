import { Thing } from "./thing.js";
import { World } from "./world.js";
import { InputVertical } from "./inputVertical.js";
import { Wire } from "./wire.js";

class LogicGate extends Thing {
    /**
     * LogicGate constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent);

        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;

        /**
         * Cached value of logic gate calc
         * @type {(Boolean|Number)[]}
         */
        this.outputs = [];

        /**
         * List of inputs the logic gate has
         * @type {Wire[]}
         */
        this.inputWires = [];

        /**
         * Number of outputs this logic gate outputs
         * @type {Number}
         */
        this.outputLength = 0;

        /**
         * Number of inputs this logic gate takes
         * @type {Number}
         */
        this.inputLength = 0;
    }

    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     */
    attachWire(wire, index) {
        this.inputWires[index] = wire;
    }

    /**
     * Validate if can be calculated
     * @returns {Boolean} can calc?
     */
    validate() {
        for (var i = 0; i < this.inputLength; i++) {
            if (!this.inputWires[i]) return false;
        }
        return true;
    }

    /**
     * Calculates the logic gate output and caches it
     * in this.val
     */
    calc() {
        throw new Error("Cannot calc using abstract LogicGate.calc()");
    }
}

class AndGate extends LogicGate {
    /**
     * LogicGate constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);
    }
}

export {LogicGate};