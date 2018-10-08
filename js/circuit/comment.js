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

        this.elementOffsetX = 16;
        this.elementOffsetY = -6;

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

        this.setup();
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

        // remove element
        // -----------------------------------------------------------------------------
        this.elm.parentElement.removeChild(this.elm);

        // remove event listeners
        // -----------------------------------------------------------------------------
        this.circuit.removeEventListener("mousedown", this.onmousedown);
        this.circuit.removeEventListener("mousemove", this.onmousemove);
    }

    setup() {
        // setup element
        // -----------------------------------------------------------------------------
        this.elm.innerText = this._text;

        this.elm.classList.add("comment");

        this.showElm(this.elmIsVisible);
        this.updateElmPos();
        this.circuit.app.ui.canvasP.appendChild(this.elm);

        // add event listeners
        // -----------------------------------------------------------------------------
        this.onmousedown = this.onmousedown.bind(this);
        this.onmousemove = this.onmousemove.bind(this);
        this.circuit.addEventListener("mousedown", this.onmousedown);
        this.circuit.addEventListener("mousemove", this.onmousemove);
    }

    /**
     * Show/hide element
     * @param {Boolean} e show element?
     */
    showElm(e) {
        if (e) {
            if (!this.elmIsVisible) {
                this.elm.classList.remove("hidden");
                this.updateElmPos();
            }
        } else {
            if (this.elmIsVisible) {
                this.elm.classList.add("hidden");
            }
        }
        this.elmIsVisible = e;
    }

    /**
     * Updates element position
     */
    updateElmPos() {
        this.setElmPos(
            this.x + this.elementOffsetX + this.circuit.camera.x, 
            this.y + this.elementOffsetY + this.circuit.camera.y
        );
    }

    /**
     * Sets element position according to the DOM
     * @param {Number} x position
     * @param {Number} y position
     */
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
        this.hovering = pointInRectCheck(
            this.circuit.mouseX, this.circuit.mouseY,
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