import { Widget } from "./widget.js";
import { UI } from "./ui.js";

class SideMenu extends Widget {
    /**
     * SideMenu constructor
     * @param {UI} ui parent UI
     */
    constructor(ui) {
        super(ui);

        this.elm.classList.add("sideMenu");

        this.elm.innerText = "SIDEMENU";
    }
}

export { SideMenu };