import { Widget } from "./widget.js";
import { UI } from "./ui.js";

class InputController extends Widget {
    /**
     * Input controller constructor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        super(ui);

        /**
         * Widget title
         * @type {HTMLHeadingElement}
         */
        this.$title = document.createElement("h3");

        /**
         * Input of circuit
         * @type {HTMLUListElement}
         */
        this.$inputs = document.createElement("ul");

        this.setup();
    }

    setup() {
        this.$title.innerText = "Input controller";

        this.elm.appendChild(this.$title);
        this.elm.appendChild(this.$inputs);
    }

    changeInput(index) {
        const circuit = this.ui.app.circuit;
        const targetInput = circuit.inputs[index];

        circuit.calcCycle();
        targetInput.setInput(~targetInput.getValue(0));
        targetInput.forwardProp();
        this.ui.updateWidgets();

        this.ui.app.requestRender();
    }

    updateStruct() {
        const circuit = this.ui.app.circuit;

        for (let i = 0; i < circuit.inputs.length; i++) {
            const input = document.createElement("li");
            const button = document.createElement("button");

            button.appendChild(document.createTextNode("input " + i.toString()));

            button.addEventListener("click", this.changeInput.bind(this, i));

            input.appendChild(button);
            this.$inputs.appendChild(input);
        }
    }
}

export { InputController };