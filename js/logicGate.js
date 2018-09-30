import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";
import { Wire } from "./wire.js";

class Abstract extends Thing {
    /**
     * LogicGate constructor
     * @param {Circuit} parent parent circuit
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

        this.connectionLocationIsDynamic = false;
    }

    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     */
    setIn(wire, index) {
        wire.setOut(this, index);
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
    backProp() {
        if (this.inputLength === null) {
            for (let i of this.inputWires) {
                i.update();
            }
        } else {
            for (var i = 0; i < this.inputLength; i++) {
                this.inputWires[i].update();
            }
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

    /**
     * Parses the outputs of this.ouputs into booleans
     * @return {Boolean[]} state of outputs
     */
    getState() {
        /**
         * parsed outputs of this.outputs
         * @type {Boolean[]}
         */
        const parsedOutputs = [];

        for (let output of this.outputs) {
            parsedOutputs.push(
                Boolean(output % 2)
            );
        }

        return parsedOutputs;
    }

    /**
     * Gets position of output of gate
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getOutPos(from, index) {
        if (this.outputLocationOffset[index]) {
            return [
                this.x + this.outputLocationOffset[index][0],
                this.y + this.outputLocationOffset[index][1]
            ];
        } else {
            let offx = this.width / 2;
    
            if (this.outputLength === 1) {
                this.outputLocationOffset[index] = [offx, 0];
                return [this.x + offx, this.y];
            } else {
                let offy = this.height / (this.outputLength - 1) * index - this.height / 2;
                offy *= 0.5;
    
                this.outputLocationOffset[index] = [offx, offy];
                return [offx, this.y + offy];
            }
        }
    }

    /**
     * Gets position of input of gate
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getInPos(from, index) {
        if (this.inputLocationOffset[index]) {
            return [
                this.x + this.inputLocationOffset[index][0],
                this.y + this.inputLocationOffset[index][1]
            ];
        } else {
            let offx = -this.width / 2;
    
            if (this.inputLength === 1) {
                this.inputLocationOffset[index] = [offx, 0];
                return [this.x + offx, this.y];
            } else {
                let offy = this.height / (this.inputLength - 1) * index - this.height / 2;
                offy *= 0.5;
    
                this.inputLocationOffset[index] = [offx, offy];
                return [this.x + offx, this.y + offy];
            }
        }
    }
}

export { Abstract };

// Constants
// -----------------------------------------------------------------------------
class Constant extends Abstract {
    /**
     * Constant constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 0;
        this.outputLength = 1;

        this.value = 0;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        this.outputs[0] = this.value;
    }
}

export { Constant };

//* should not exist here, stays for development purposes
class Constant1 extends Constant {
    /**
     * Constant constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);
        this.value = 1;
    }
}

export { Constant1 };

//* should not exist here, stays for development purposes
class Constant0 extends Abstract { }

export { Constant0 };

// Gates
// -----------------------------------------------------------------------------
class AND extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
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

export { AND };

class OR extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
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

export { OR };

class XOR extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = a ^ b;
    }
}

export { XOR };

class NOT extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 1;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState();

        this.outputs[0] = ~a;
    }
}

export { NOT };

class NAND extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = ~(a & b);
    }
}

export { NAND };

class NOR extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = ~(a | b);
    }
}

export { NOR };

class NXOR extends Abstract {
    /**
     * AndGate constructor
     * @param {Circuit} parent parent circuit
     * @param {Number} x center x
     * @param {Number} y center y
     */
    constructor(parent, x, y) {
        super(parent, x, y);

        this.inputLength = 2;
        this.outputLength = 1;
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        let a = this.inputWires[0].getState(),
            b = this.inputWires[1].getState();

        this.outputs[0] = ~(a ^ b);
    }
}

export { NXOR };