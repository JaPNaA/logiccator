import { Circuit } from "./circuit.js";

class App {
    constructor() {
        /** 
         * Element canvas#c
         * @type {HTMLCanvasElement}
         */
        // @ts-ignore
        this.canvas = document.getElementById("c");
        
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
        this.circuit = new Circuit(this);


        this.setup();
    }

    setup() {
        // register events
        // -----------------------------------------------------------------------------
        addEventListener("resize", this.resizeHandler.bind(this));

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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.shouldRender = true;
    }
}

export {App};