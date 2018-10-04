import { Thing } from "./thing.js";
import { App } from "./app.js";
import * as gate from "./logicGate.js";
import { Wire } from "./wire.js";
import { InputVertical } from "./inputVertical.js";
import { Comment } from "./comment.js";
import { OutputVertical } from "./outputVertical.js";

class Circuit {
    /**
     * circuit constructor
     * @param {App} app circuit parent
     */
    constructor(app) {
        this.app = app;

        /**
         * Everything inside of the circuit
         * @type {Thing[]}
         */
        this.things = [];

        this.inputs = [];
        this.outputs = [];

        this.setup();
    }

    setup() {
        //* temp

        const input0 = new InputVertical(this, 50);

        const input1 = new InputVertical(this, 150);

        const tgate10 = new gate.NOT(this, 400, 50);
        const tgate11 = new gate.NOT(this, 400, 200);

        {
            const tgate0 = new gate.NXOR(this, 250, 50);

            const wire0 = new Wire(this);
            tgate0.setIn(wire0, 0);
            wire0.setIn(input0, 0);

            const wire1 = new Wire(this);
            tgate0.setIn(wire1, 1);
            wire1.setIn(input1, 0);

            const wire2 = new Wire(this);
            tgate10.setIn(wire2, 0);
            wire2.setIn(tgate0, 0);
        } {
            const tgate0 = new gate.NAND(this, 250, 200);

            const wire0 = new Wire(this);
            tgate0.setIn(wire0, 0);
            wire0.setIn(input0, 0);

            const wire1 = new Wire(this);
            tgate0.setIn(wire1, 1);
            wire1.setIn(input1, 0);

            const wire2 = new Wire(this);
            tgate11.setIn(wire2, 0);
            wire2.setIn(tgate0, 0);
        }

        const tgate = new gate.XOR(this, 550, 125);

        const wire1 = new Wire(this);
        tgate.setIn(wire1, 1);
        wire1.setIn(tgate11, 0);

        const wire2 = new Wire(this);
        tgate.setIn(wire2, 0);
        wire2.setIn(tgate10, 0);

        const comment = new Comment(this, 550, 175);
        comment.text = "This is a test comment\nthis is a newline test";
        comment.collapsed = true;

        const outputWire = new Wire(this);
        const output = new OutputVertical(this, 650);
        output.setIn(outputWire, 0);
        outputWire.setIn(tgate, 0);

        input0.setInput(0);
        input1.setInput(0);
        output.backProp();
        console.log(output.getState());


        input0.setInput(1);
        input1.setInput(0);
        output.backProp();
        console.log(output.getState());


        input0.setInput(0);
        input1.setInput(1);
        output.backProp();
        console.log(output.getState());


        input0.setInput(1);
        input1.setInput(1);
        output.backProp();
        console.log(output.getState());

        console.log(this);

        // this setup represents (a, b) => (!!(a ^ b)) ^ (!!(a & b))
    }

    draw() {
        // console.log("draw");
        for (let thing of this.things) {
            thing.draw(this.app.X);
        }
    }

    /**
     * Mousemove event handler
     * @param {MouseEvent} e event information
     */
    onmousemove(e) {
        for (let thing of this.things) {
            thing.onmousemove(e);
        }
    }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    onmousedown(e) {
        for (let thing of this.things) {
            thing.onmousedown(e);
        }
    }

    /**
     * Mouseup event handler
     * @param {MouseEvent} e event information
     */
    onmouseup(e) {
        for (let thing of this.things) {
            thing.onmouseup(e);
        }
    }
}

export { Circuit };