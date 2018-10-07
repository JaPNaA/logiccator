import { App } from "../app.js";

class UI {
    /**
     * UI constructor
     * @param {App} app parent app
     */
    constructor(app) {
        /**
         * Parent app
         * @type {App}
         */
        this.app = app;

        /** 
         * Parent of canvas element, also anything else that 
         * overlays the canvas
         * @type {HTMLDivElement} 
         */
        this.canvasP = document.createElement("div");

        /**
         * An element containing a list of gates
         * @type {HTMLDivElement}
         */
        this.gateBar = document.createElement("div");

        /**
         * An element containing widgets, properties, and controls
         * for the circuit
         * @type {HTMLDivElement}
         */
        this.sideMenu = document.createElement("div");

        this.setup();
    }

    setup() {
        // setup elements
        // -----------------------------------------------------------------------------
        this.canvasP.classList.add("canvasP");
        this.canvasP.appendChild(this.app.canvas);

        this.gateBar.classList.add("gateBar");
        this.gateBar.innerText = "GATEBAR";

        this.sideMenu.classList.add("sideMenu");
        this.sideMenu.innerText = "SIDEMENU";
    }

    /**
     * appends itself to element
     * @param {HTMLElement} elm element to append to
     */
    appendTo(elm) {
        elm.appendChild(this.canvasP);
        elm.appendChild(this.gateBar);
        elm.appendChild(this.sideMenu);
    }
}

export { UI };