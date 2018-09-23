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
        this.width = 6;
        this.height = 6;

        /**
         * Comment text
         * @type {String}
         */
        this.text = "Enter comment...";

        /**
         * Is comment collapsed?
         * @type {Boolean}
         */
        this.collapsed = true;
    }

    /**
     * Draw comment
     * @param {CanvasRenderingContext2D} X drawing context
     */
    draw(X) {
        X.fillStyle = "#009800";
        X.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        if (!this.collapsed) {
            X.font = "16px Helvetica";
            X.textAlign = "left";
            X.textBaseline = "top";
            X.fillStyle = "#009800";
            X.fillText(this.text, this.x + 4, this.y + 4);
        }
    }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    onmousedown(e) {
        this.collapsed = false;
        this.circuit.app.shouldRender = true;
    }

    /**
     * Mouseup event handler
     * @param {MouseEvent} e event information
     */
    onmouseup(e) {
        this.collapsed = true;
        this.circuit.app.shouldRender = true;
    }

    /**
     * Mousemove event handler
     * @param {MouseEvent} e event information
     */
    onmousemove(e) { }
}

export { Comment };