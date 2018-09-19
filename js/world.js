import { Thing } from "./thing.js";
import { App } from "./app.js";
import * as gate from "./logicGate.js";
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
        const tgate = new gate.NOT(this, 50, 50);
        const wire0 = new Wire(this);
        const wire1 = new Wire(this);
        const cons0 = new gate.Constant1(this, 150, 50);
        const cons1 = new gate.Constant0(this, 150, 150);
        wire0.setIn(cons0, 0);
        wire1.setIn(cons1, 0);
        tgate.attachWire(wire0, 0);
        tgate.attachWire(wire1, 1);
        this.things.push(tgate, wire0, wire1, cons0, cons1);
        tgate.update();
        tgate.calc();

        console.log(this.things);
        console.log(tgate.getState());
    }

    draw() {
        for (let thing of this.things) {
            thing.draw(this.app.X);
        }
    }
}

export {World};