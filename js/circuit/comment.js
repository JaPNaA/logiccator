import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";
import { pointInRectCheck } from "./utils.js";
import { Camera } from "./camera.js";

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
        this.width = 8;
        this.height = 8;
        this.hitboxWidth = 12;
        this.hitboxHeight = 12;

        /**
         * Comment text
         * @type {String}
         */
        this._text = "Enter comment...";

        /**
         * Is comment collapsed?
         * @type {Boolean}
         */
        this.collapsed = true;

        /**
         * Is mouse hovering over comment?
         * @type {Boolean}
         */
        this.hovering = false;

        /**
         * Was hovering over comment?
         * @type {Boolean}
         */
        this.wasHovering = false;

        /**
         * Comment HTML element
         * @type {HTMLDivElement}
         */
        this.elm = document.createElement("div");

        /**
         * If the element is visible to the user or not
         * @type {Boolean}
         */
        this.elmIsVisible = true;

        this.setupElement();
    }

    set text(e) {
        this.elm.innerText = e;
        this._text = e;
    }

    get text() {
        return this._text;
    }

    deconstructor() {
        this._deconstructor();
        this.elm.parentElement.removeChild(this.elm);
    }

    setupElement() {
        this.elm.innerText = this._text;

        this.elm.classList.add("comment");

        this.showElm(this.elmIsVisible);
        this.setElmPos(this.x + 16, this.y - 6);
        this.circuit.app.ui.canvasP.appendChild(this.elm);
    }

    /**
     * Show/hide element
     * @param {Boolean} e show element?
     */
    showElm(e) {
        if (e) {
            if (!this.elmIsVisible) {
                this.elm.classList.remove("hidden");
            }
        } else {
            if (this.elmIsVisible) {
                this.elm.classList.add("hidden");
            }
        }
        this.elmIsVisible = e;
    }

    setElmPos(x, y) {
        this.elm.style.left = x + "px";
        this.elm.style.top = y + "px";
    }

    /**
     * Draw comment
     * @param {CanvasRenderingContext2D} X drawing context
     * @param {Camera} camera camera
     */
    draw(X, camera) {
        camera.transformTo(X, this);

        X.fillStyle = this.collapsed ? "#44b644" : "#009800";
        X.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        if (!this.collapsed || this.hovering) {
            this.showElm(true);
        } else {
            this.showElm(false);
        }

        camera.resetTransform(X);
    }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    onmousedown(e) {
        if (this.hovering) {
            this.collapsed = !this.collapsed;
            this.circuit.app.requestRender();
        }
    }

    /**
     * Mousemove event handler
     * @param {MouseEvent} e event information
     */
    onmousemove(e) {
        const app = this.circuit.app;
        this.hovering = pointInRectCheck(app.mouseX, app.mouseY,
            this.x - this.hitboxWidth / 2,
            this.y - this.hitboxHeight / 2,
            this.hitboxWidth, this.hitboxHeight
        );

        if (this.hovering !== this.wasHovering) {
            this.circuit.app.requestRender();
        }
        this.wasHovering = this.hovering;
    }
}

export { Comment };