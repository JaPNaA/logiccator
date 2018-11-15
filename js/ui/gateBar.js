import { Widget } from "./widget.js";
import { UI } from "./ui.js";
import * as gate from "../circuit/logicGate.js";

class GateBarGate extends Widget {
    /**
     * GateBarGate constructor
     * @param {UI} ui parent
     * @param {typeof gate.Abstract} gate to represent
     */
    constructor(ui, gate) {
        super(ui);

        this.gate = gate;
        this.gateName = gate.gateName;

        this.setup();
    }

    setup() {
        this.elm.innerText = this.gateName;
        this.elm.classList.add("gate");
    }
}

class GateBar extends Widget {
    /**
     * GateBar constructor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        super(ui);

        this.elm.classList.add("gateBar");

        this.elm.innerText = "GATEBAR";

        this.setup();
    }

    setup() {
        let gateBarGate = new GateBarGate(this.ui, gate.AND);
        this.append(gateBarGate);
    }
}

export { GateBar };