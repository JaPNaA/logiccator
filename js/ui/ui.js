import { App } from "../app.js";
import { GateBar } from "./gateBar.js";
import { SideMenu } from "./sideMenu.js";
import { InputController } from "./inputController.js";

class UI {
    /**
     * UI constructor (setup not called in constructor)
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
         * @type {GateBar}
         */
        this.gateBar = null;

        /**
         * An element containing widgets, properties, and controls
         * for the circuit
         * @type {SideMenu}
         */
        this.sideMenu = null;
    }

    setup() {
        // create objects
        // -----------------------------------------------------------------------------
        this.gateBar = new GateBar(this);
        this.sideMenu = new SideMenu(this);

        // setup elements
        // -----------------------------------------------------------------------------
        this.canvasP.classList.add("canvasP");
        this.canvasP.appendChild(this.app.canvas);

        //* temp
        const inputController = new InputController(this);
        this.sideMenu.append(inputController);
    }

    /**
     * appends itself to element
     * @param {HTMLElement} elm element to append to
     */
    appendTo(elm) {
        elm.appendChild(this.canvasP);
        this.gateBar.appendTo(elm);
        this.sideMenu.appendTo(elm);
    }
}

export { UI };