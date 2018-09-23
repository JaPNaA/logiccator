import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";

class Comment extends Thing {
    /**
     * Comment constructor
     * @param {Circuit} circuit parent circuit
     * @param {Number} x position
     * @param {Number} y position
     */
    constructor(circuit, x, y) {
        super(circuit);

        this.x = x;
        this.y = y;

        /**
         * Comment text
         * @type {String}
         */
        this.text = "Enter comment...";
    }

    /**
     * Draw comment
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        X.font = "16px Helvetica";
        X.textAlign = "left";
        X.textBaseline = "top";
        X.fillStyle = "#009800";
        X.fillText(this.text, this.x, this.y);
    }
}

export { Comment };