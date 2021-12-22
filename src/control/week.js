/**
 * control for week calendars
 */

import Base from "./base.js";
import Indicator from "./indicator.js";

export default class extends Base{

    /**
     * build control
     */
    init(){
        super.init();
        this.week = new Indicator("week");
        this.controls.push(this.week);
        this.prev.element.insertAdjacentElement("afterend", this.week.element);
    }
}
