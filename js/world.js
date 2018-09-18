import { Thing } from "./thing.js";
import { App } from "./app.js";
import { LogicGate } from "./logicGate.js";

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
        const testThing = new LogicGate(this, 50, 50);
        this.things.push(testThing);

    }

    draw() {
        for (let thing of this.things) {
            thing.draw(this.app.X);
        }
    }
}

export {World};