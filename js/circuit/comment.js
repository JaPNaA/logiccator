import { Thing } from "./thing.js";
import { Circuit } from "./circuit.js";
import { pointInRectCheck } from "../utils.js";
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
         * Is comment offscreen?
         * @type {Boolean}
         */
        this.offscreen = false;

        /**
         * Is mouse hovering over comment?
         * @type {Boolean}
         */
        this.hovering = false;

        /**
         * Has comment been dragged since last mousedown?
         * @type {Boolean}
         */
        this.dragged = false;

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

        this.showAndUpdateElmPos(this.elmIsVisible);
        this.circuit.app.ui.canvasP.appendChild(this.elm);

        // add event listeners
        // -----------------------------------------------------------------------------
        this.onmousedown = this.onmousedown.bind(this);
        this.onmousemove = this.onmousemove.bind(this);
        this.onmouseup = this.onmouseup.bind(this);
        this.oncameramove = this.oncameramove.bind(this);

        this.circuit.addEventListener("mousedown", this.onmousedown);
        this.circuit.addEventListener("mousemove", this.onmousemove);
        this.circuit.addEventListener("mouseup", this.onmouseup);
        this.circuit.camera.addEventListener("move", this.oncameramove);
    }

    /**
     * Show/hide element and update element position
     * @param {Boolean} e show element?
     */
    showAndUpdateElmPos(e) {
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

    /**
     * Updates element position
     */
    updateElmPos() {
        let x = this.x + this.elementOffsetX + this.circuit.camera.x;
        let y = this.y + this.elementOffsetY + this.circuit.camera.y;
        let w = this.elm.clientWidth;
        let h = this.elm.clientHeight;

        let mx = x + w;
        let my = y + h;

        // Handle invisible comments
        // -----------------------------------------------------------------------------
        if (
            x > 0 && x < this.circuit.app.width &&
            y > 0 && y < this.circuit.app.height
        ) {
            this.offscreen = false;
        } else {
            this.offscreen = true;
        }

        // Handle visible offscreen element comments
        // -----------------------------------------------------------------------------
        if (mx > this.circuit.app.width) {
            x += -w - this.elementOffsetX * 2;
        }

        if (my > this.circuit.app.height) {
            y += -h - this.elementOffsetY * 2;
        }

        this.setElmPos(x, y);
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

        if ((!this.collapsed || this.hovering) && !this.offscreen) {
            this.showAndUpdateElmPos(true);
        } else {
            this.showAndUpdateElmPos(false);
        }

        camera.resetTransform(X);
    }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    onmousedown(e) {
        this.dragged = false;

        if (this.hovering) {
            this.active = true;
        }
    }

    /**
     * Mouseup handler
     * @param {MouseEvent} e event information
     */
    onmouseup(e) {
        if (this.hovering && !this.dragged) {
            this.collapsed = !this.collapsed;
            this.circuit.app.requestRender();
        }

        this.active = false;
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

        // change in hover --> re-render collapsed
        if (this.hovering !== this.wasHovering) {
            this.circuit.app.requestRender();
        }
        this.wasHovering = this.hovering;

        // dragging comment --> close comment
        if (this.active && this.collapsed) {
            this.collapsed = true;
            this.hovering = false;
            this.circuit.app.requestRender();
        }

        if (this.active) {
            this.dragged = true;
        }
    }

    /**
     * Camera move handler
     */
    oncameramove() {
        this.updateElmPos();
    }
}

export { Comment };