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
         * List of outputs the logic gate has
         * @type {Wire[]}
         */
        this.outputWires = [];

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

        /**
         * Color of gate
         * @type {String}
         */
        this.color = "#ff0000";

        /**
         * do the connection locations change?
         */
        this.connectionLocationIsDynamic = false;
    }

    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     * @returns {Number} index of gate wire connected to
     */
    setIn(wire, index) {
        // wire.setOut(this, index);
        this.inputWires[index] = wire;
        
        wire.gateOut = this;
        wire.gateOutIndex = index;
        wire.validate();
        return index;
    }

    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     * @returns {Number} index of gate wire connected to
     */
    setOut(wire, index) {
        // wire.setIn(this, index);
        wire.gateIn = this;
        wire.gateInIndex = index;
        wire.validate();

        this.outputWires[index] = wire;
        return index;
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
                i.backProp();
            }
        } else {
            for (var i = 0; i < this.inputLength; i++) {
                this.inputWires[i].backProp();
            }
        }
        this.calc();
    }

    /**
     * Update all outputs recursively
     */
    forwardProp() {
        console.groupCollapsed(this.constructor.name);
        console.log(this);
        this.calc();

        if (this.outputLength === null) {
            for (let i of this.outputWires) {
                i.forwardProp();
            }
        } else {
            for (var i = 0; i < this.outputLength; i++) {
                this.outputWires[i].forwardProp();
            }        
        }
        console.groupEnd();
    }

    /**
     * Calculates the logic gate output and caches it
     * in this.outputs
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

    /**
     * sets up drawing context for gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    predraw(X) {
        X.fillStyle = this.color;
        X.strokeStyle = this.color;
        X.font = "16px Arial";
        X.textAlign = "center";
        X.textBaseline = "middle";

        X.beginPath();
        X.lineWidth = 2;
        X.strokeRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width, this.height
        );
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("AND", this.x, this.y);
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("OR", this.x, this.y);
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("XOR", this.x, this.y);
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("NOT", this.x, this.y);
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
        console.log(this.outputs);
    }

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("NAND", this.x, this.y);
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("NOR", this.x, this.y);
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

    /**
     * draw gate
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        this.predraw(X);
        X.fillText("NXOR", this.x, this.y);
    }
}

export { NXOR };