import { Thing } from "./thing.js";
import { Circuit } from "./world.js";
import * as gate from "./logicGate.js";

class Vertical extends gate.Constant {
    /**
     * Vertical constructor
     * @param {Circuit} world parent world
     * @param {Number} x x position
     */
    constructor(world, x) {
        super(world, x, 0);

        this.width = 4;
        this.height = null;
    }

    /**
     * draw vertical
     * @param {CanvasRenderingContext2D} X rendering context
     */
    draw(X) {
        X.beginPath();
        X.moveTo(this.x, this.y);
        X.lineTo(this.x, this.world.app.canvas.height);
        X.lineWidth = this.width;
        X.stroke();
    }
}

export {Vertical};