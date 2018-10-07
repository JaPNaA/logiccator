import { Widget } from "./widget.js";
import { UI } from "./ui.js";

class InputController extends Widget {
    /**
     * Input controller constructor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        super(ui);

        this.elm.innerText = "Input controller";

        this.setup();
    }

    setup() {
        const circuit = this.ui.app.circuit;
        
        //* temp
        let _temp = 0;
        this.elm.addEventListener("click", function() {
            _temp ^= 1;
            circuit.inputs[0].setInput(_temp);

            circuit.calcCycle();
            circuit.inputs[0].forwardProp();
            circuit.app.requestRender();
        });
    }
}

export { InputController };