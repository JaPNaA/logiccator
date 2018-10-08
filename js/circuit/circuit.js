import { Thing } from "./thing.js";
import { App } from "../app.js";
import * as gate from "./logicGate.js";
import { Wire } from "./wire.js";
import { InputVertical } from "./inputVertical.js";
import { Comment } from "./comment.js";
import { OutputVertical } from "./outputVertical.js";
import { wait } from "./utils.js";

class Circuit {
    /**
     * Circuit constructor (setup not called in constructor)
     * @param {App} app circuit parent
     */
    constructor(app) {
        this.app = app;

        /**
         * Everything inside of the circuit
         * @type {Thing[]}
         */
        this.things = [];

        /**
         * Inputs of circuit
         * @type {InputVertical[]}
         */
        this.inputs = [];

        /**
         * Outputs of ciruit
         * @type {OutputVertical[]}
         */
        this.outputs = [];

        /**
         * Prevents gates from being calced twice for no reason
         * @type {Symbol}
         */
        this.calcId = null;

        /**
         * Is using calcId?
         * @type {Boolean}
         */
        this.useCalcId = false;

        /**
         * Is this circuit is ready for user input?
         * @type {Boolean}
         */
        this.ready = false;
    }

    setup() {
        //* temp
        // START TEMP
        // -----------------------------------------------------------------------------
        const input0 = new InputVertical(this, 50);

        const input1 = new InputVertical(this, 150);

        const tgate10 = new gate.NOT(this, 400, 50);
        const tgate11 = new gate.NOT(this, 400, 200);

        const output0 = new OutputVertical(this, 650);
        const output1 = new OutputVertical(this, 750);

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
            const tgate0 = new gate.AND(this, 250, 275);

            const wire0 = new Wire(this);
            tgate0.setIn(wire0, 0);
            wire0.setIn(input0, 0);

            const wire1 = new Wire(this);
            tgate0.setIn(wire1, 1);
            wire1.setIn(input1, 0);

            const wire2 = new Wire(this);
            tgate11.setIn(wire2, 0);
            wire2.setIn(tgate0, 0);

            {
                const tgate1 = new gate.NOR(this, 400, 350);

                const wire3 = new Wire(this);
                tgate1.setIn(wire3, 0);
                wire3.setIn(tgate0, 0);

                const wire4 = new Wire(this);
                tgate1.setIn(wire4, 1);
                wire4.setIn(input0, 0);

                const wire5 = new Wire(this);
                output0.setIn(wire5, 0);
                wire5.setIn(tgate1, 0);
            }

        } {
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
            output1.setIn(outputWire, 0);
            outputWire.setIn(tgate, 0);
        }


        this.calcCycle();
        output0.backProp();
        output1.backProp();
        
        input0.setInput(0);
        input1.setInput(1);
        
        this.calcCycle();
        input0.forwardProp();
        this.calcCycle();
        input1.forwardProp();

        this.app.requestRender();

        // input0.setInput(0);
        // input1.setInput(1);

        // this.calcCycle();
        // output0.backProp();
        // output1.backProp();
        
        console.log(this);

        // END TEMP
        // -----------------------------------------------------------------------------
        this.ready = true;

        this.app.ui.updateStructWidgets();
    }

    /**
     * Starts calc cycle, makes sure no gates get calculated 
     * twice for no reason by updating the calcId. 
     * 
     * The calcId is then checked for every calc to make sure
     * that it has't already been calced during the calcCycle.
     */
    calcCycle() {
        this.useCalcId = true;
        this.calcId = Symbol(); // symbol always creates a unique identifier
    }

    /**
     * Runs circuit with inputs
     * @param {Number[]} inputs inputs to circuit
     * @returns {Number[]} outputs
     */
    run(inputs) {
        var i, outputs = [];
        for (i = 0; i < this.inputs.length; i++) {
            this.inputs[i].setInput(inputs[i]);
        }

        this.calcCycle();
        for (i = 0; i < this.outputs.length; i++) {
            this.outputs[i].backProp();
            outputs.push(this.outputs[i].getValue(0));
        }

        this.app.ui.updateWidgets();
        return outputs;
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