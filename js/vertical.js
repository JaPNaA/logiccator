import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";
import * as gate from "./logicGate.js";
import { Wire } from "./wire.js";

class Vertical extends gate.Constant {
    /**
     * Vertical constructor
     * @param {Circuit} circuit parent circuit
     * @param {Number} x x position
     */
    constructor(circuit, x) {
        super(circuit, x, 0);

        this.connectionLocationIsDynamic = true;

        this.inputLength = null;
        this.outputLength = null;

        this.width = 4;
        this.height = null;
    }


    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     * @return {Number} index of gate wire connected to
     */
    setIn(wire, index) {
        const ix = this.inputWires.length;

        this.inputWires[ix] = wire;

        wire.gateOut = this;
        wire.gateOutIndex = ix;
        wire.validate();
        return ix;
        // wire.setOut(this, ix); // causes an equivent to "push"
        // return ix;
    }

    /**
     * attaches a wire to the input of gate
     * @param {Wire} wire wire to attach to
     * @param {Number} index where the wire attaches to
     * @returns {Number} index of gate wire connected to
     */
    setOut(wire, index) {
        const ix = this.outputWires.length;
        // wire.setIn(this, index);
        wire.gateIn = this;
        wire.gateInIndex = 0;
        wire.validate();

        this.outputWires[ix] = wire;
        return ix;
    }


    /**
     * draw vertical
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        if (this.outputs[0]) {
            X.strokeStyle = "#ff0000";
        } else {
            X.strokeStyle = "#000000";
        }

        X.beginPath();
        X.moveTo(this.x, this.y);
        X.lineTo(this.x, this.circuit.app.canvas.height);
        X.lineWidth = this.width;
        X.stroke();
    }
}

export { Vertical };