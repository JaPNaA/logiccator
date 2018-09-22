import { Vertical } from "./vertical.js";
import { Circuit } from "./world.js";
import { Thing } from "./thing.js";

class InputVertical extends Vertical {
    /**
     * Input vertical constructor
     * @param {Circuit} world parent world
     * @param {Number} x position
     */
    constructor(world, x) {
        super(world, x);

        this.world.inputs.push(this);
    }

    deconstructor() {
        this._deconstructor();
        this.world.inputs.splice(this.world.inputs.indexOf(this), 1);
    }

    /**
     * sets the input of this
     * @param {Number} val value
     */
    setInput(val) {
        this.value = val;
    }

    /**
     * Gets position of input
     * @param {Thing} from item from
     * @param {Number} index index of output to
     * @returns {Number[]} x, y position
     */
    getOutPos(from, index) {
        if (from.connectionLocationIsDynamic) {
            console.warn("Attempting to connect dynamic to dynamic, not implemented");
            return;
        }

        let [x, y] = from.getInPos(null, index);
        
        x = this.x;
        
        return [x, y];
    }
}
export { InputVertical };