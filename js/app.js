import { Circuit } from "./circuit/circuit.js";
import { UI } from "./ui/ui.js";

class App {
    constructor() {
        /** 
         * Element canvas#c
         * @type {HTMLCanvasElement}
         */
        // @ts-ignore
        this.canvas = document.createElement("canvas");

        /** 
         * 2D rendering context of this.canvas
         * @type {CanvasRenderingContext2D} 
         */
        this.X = this.canvas.getContext("2d");

        /**
         * Checked every time render is called, this will 
         * cause the canvas to update only when required
         * @type {Boolean}
         */
        this.shouldRender = true;

        /**
         * Checked every time render is called, this will
         * force the canvas to update if there's an 
         * animation running
         * @type {Boolean}
         */
        this.animating = false;

        /**
         * The circuit that contains all of the gates, inputs,
         * outputs, and comments.
         * @type {Circuit}
         */
        this.circuit = null;

        /**
         * The UI of the app
         * @type {UI}
         */
        this.ui = null;

        /**
         * Main element, where everything should be contained
         * @type {HTMLElement}
         */
        this.elm = document.createElement("div");

        /**
         * Offset from clientX
         * @type {Number}
         */
        this.mouseOffsetX = 0;

        /**
         * Offset from clientY
         * @type {Number}
         */
        this.mouseOffsetY = 0;


        /**
         * Mouse position x
         * @type {Number}
         */
        this.mouseX = 0;

        /**
         * Mouse position y
         * @type {Number}
         */
        this.mouseY = 0;

        this.setup();
    }

    setup() {
        // Create objects
        // -----------------------------------------------------------------------------
        this.ui = new UI(this);
        this.circuit = new Circuit(this);

        // setup elements
        // -----------------------------------------------------------------------------
        this.canvas.classList.add("canvas");
        
        this.elm.classList.add("main");
        this.ui.appendTo(this.elm);
        document.body.appendChild(this.elm);

        // register events
        // -----------------------------------------------------------------------------
        addEventListener("resize", this.resizeHandler.bind(this));
        addEventListener("mousemove", this.mousemoveHandler.bind(this));
        addEventListener("mousedown", this.mousedownHandler.bind(this));
        addEventListener("mouseup", this.mouseupHandler.bind(this));

        // call inital functions
        // -----------------------------------------------------------------------------
        this.resizeHandler();
        this._renderLoop();
    }

    /**
     * Clears and draws on the canvas
     */
    render() {
        if (!this.shouldRender && !this.animating) return;
        this.shouldRender = false;

        /**
         * this.X alias
         */
        const X = this.X;

        // clear canvas
        X.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw
        this.circuit.draw();
        // X.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        // X.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Requests app to render on reqestAnimationFrame
     */
    requestRender() {
        this.shouldRender = true;
    }

    /**
     * Wrapper around this.render(), which calls itself 
     * to prevent memory leaks (hopefully)
     */
    _renderLoop() {
        function _render() {
            this.render();
            requestAnimationFrame(_renderBound);
        }

        const _renderBound = _render.bind(this);

        _renderBound();
    }

    /**
     * Resizes the canvas (#c) to the max
     */
    resizeHandler() {
        this.canvas.width = this.ui.canvasP.clientWidth;
        this.canvas.height = this.ui.canvasP.clientHeight;
        
        const boundingClientRect = this.canvas.getBoundingClientRect();
        this.mouseOffsetX = boundingClientRect.left;
        this.mouseOffsetY = boundingClientRect.top;

        this.requestRender();
    }

    /**
     * Mousemove event handler
     * @param {MouseEvent} e event information
     */
    mousemoveHandler(e) {
        this.mouseX = e.clientX - this.mouseOffsetX;
        this.mouseY = e.clientY - this.mouseOffsetY;
        this.circuit.onmousemove(e);
    }

    /**
     * Mousedown event handler
     * @param {MouseEvent} e event information
     */
    mousedownHandler(e) {
        this.circuit.onmousedown(e);
    }

    /**
     * Mouseup event handler
     * @param {MouseEvent} e event information
     */
    mouseupHandler(e) {
        this.circuit.onmouseup(e);
    }
}

export { App };