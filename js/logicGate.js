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
         * @type {Number[]}
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
        wire.setOut(this, index);
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
     * Updates all inputs recursively
     */
    update() {
        for (var i = 0; i < this.inputLength; i++) {
            this.inputWires[i].update();
        }
        this.calc();
    }

    /**
     * Calculates the logic gate output and caches it
     * in this.val
     */
    calc() {
        throw new Error("Cannot calc using abstract LogicGate.calc()");
    }
}

class Constant1 extends LogicGate {
    /**
     * Constant constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 0;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        this.outputs[0] = 1;
    }
}

class Constant0 extends LogicGate {
    /**
     * Constant constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 0;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        this.outputs[0] = 0;
    }
}

class AndGate extends LogicGate {
    /**
     * AndGate constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 0;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = a & b;
    }
}

class OrGate extends LogicGate {
    /**
     * AndGate constructor
     * @param {World} parent parent world
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 0;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = a | b;
    }
}

export {LogicGate, Constant1, Constant0, AndGate, OrGate};