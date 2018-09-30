import { Vertical } from "./vertical.js";
import { Circuit } from "./circuit.js";
import { Thing } from "./thing.js";

class InputVertical extends Vertical {
    /**
     * Input vertical constructor
     * @param {Circuit} circuit parent circuit
     * @param {Number} x position
     */
    constructor(circuit, x) {
        super(circuit, x);
        
        this.value = 0;

        this.circuit.inputs.push(this);
    }

    deconstructor() {
        this._deconstructor();
        this.circuit.inputs.splice(this.circuit.inputs.indexOf(this), 1);
    }

    /**
     * sets the input of this
     * @param {Number} val value
     */
    setInput(val) {
        this.value = val;
    }

    setIn() {
        throw TypeError("Cannot set input wire of inputVertical");
    }

    /**
     * Gets position of input
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getOutPos(from, index) {
        if (from.connectionLocationIsDynamic) {
            console.warn("Attempting to connect dynamic to dynamic, not implemented");
            return;
        }

        let [x, y] = from.getInPos(null, index);
        
        x = this.x;
        
        return [x, y];
    }
}
export { InputVertical };