import { Widget } from "./widget.js";
import { UI } from "./ui.js";

class GateBar extends Widget {
    /**
     * GateBar constructor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        super(ui);

        this.elm.classList.add("gateBar");

        this.elm.innerText = "GATEBAR";
    }
}

export { GateBar };