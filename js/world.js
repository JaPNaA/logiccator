import { Thing } from "./thing.js";
import { App } from "./app.js";
import { LogicGate, AndGate, Constant0, Constant1, OrGate } from "./logicGate.js";
import { Wire } from "./wire.js";

class World {
    /**
     * World constructor
     * @param {App} app world parent
     */
    constructor(app) {
        this.app = app;

        /**
         * Everything inside of the world
         * @type {Thing[]}
         */
        this.things = [];

        this.setup();
    }

    setup() {
        //* temp
        const gate = new OrGate(this, 50, 50);
        const wire0 = new Wire(this);
        const wire1 = new Wire(this);
        const cons0 = new Constant1(this, 150, 50);
        const cons1 = new Constant0(this, 150, 150);
        wire0.setIn(cons0, 0);
        wire1.setIn(cons1, 0);
        gate.attachWire(wire0, 0);
        gate.attachWire(wire1, 1);
        this.things.push(gate, wire0, wire1, cons0, cons1);
        gate.update();
        gate.calc();

        console.log(this.things);
        console.log(gate.outputs);
    }

    draw() {
        for (let thing of this.things) {
            thing.draw(this.app.X);
        }
    }
}

export {World};