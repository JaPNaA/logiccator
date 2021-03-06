import { UI } from "./ui.js";

class Widget {
    /**
     * Widget (abstract) constrcutor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        /**
         * Parent ui element
         * @type {UI}
         */
        this.ui = ui;

        /**
         * The element where the widget lives
         * @type {HTMLDivElement}
         */
        this.elm = document.createElement("div");
        this.elm.classList.add("widget");

        this.ui.widgets.push(this);
    }

    /**
     * Appends to parent element
     * @param {HTMLElement} elm element to append to
     */
    appendTo(elm) {
        elm.appendChild(this.elm);
    }

    /**
     * appends widget
     * @param {Widget} widget widget to append
     */
    append(widget) {
        widget.appendTo(this.elm);
    }

    /**
     * Called when structure of circuit changes
     */
    updateStruct() { }

    /**
     * Called when any part of circuit changes
     */
    update() { }
}

export { Widget };