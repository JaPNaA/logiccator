import { Vertical } from "./vertical.js";
import { Circuit } from "./circuit.js";
import { Thing } from "./thing.js";
import { Wire } from "./wire.js";

class OutputVertical extends Vertical {
    /**
     * Input vertical constructor
     * @param {Circuit} circuit parent circuit
     * @param {Number} x position
     */
    constructor(circuit, x) {
        super(circuit, x);

        this.inputLength = null;

        this.circuit.outputs.push(this);
    }

    deconstructor() {
        this._deconstructor();
        this.circuit.outputs.splice(this.circuit.outputs.indexOf(this), 1);
    }

    calc() {
        if (!this.validate()) {
            throw new Error("Invalid inputs to gate");
        }

        this.outputs[0] = this.inputWires[0].getState();
    }

    /**
     * Gets position of input
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getInPos(from, index) {
        if (from.connectionLocationIsDynamic) {
            console.warn("Attempting to connect dynamic to dynamic, not implemented");
            return;
        }

        let [x, y] = from.getOutPos(null, index);

        x = this.x;

        return [x, y];
    }
}

OutputVertical.gateName = "Output";

export { OutputVertical };