import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";
import * as gate from "./logicGate.js";

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
     */
    setIn(wire, index) {
        wire.setOut(this, this.inputWires.length); // causes an equivent to "push"
    }

    /**
     * draw vertical
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        X.beginPath();
        X.moveTo(this.x, this.y);
        X.lineTo(this.x, this.circuit.app.canvas.height);
        X.lineWidth = this.width;
        X.stroke();
    }
}

export {Vertical};