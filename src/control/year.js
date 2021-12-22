/**
 * control for year calendars
 */

import Base from "./base.js";
import Indicator from "./indicator.js";
import Years from "./chooser/years.js";

export default class extends Base{

    /**
     * build control
     */
    init(){
        super.init();
        this.year = new Indicator("year");
        this.controls.push(this.year);
        this.prev.element.insertAdjacentElement("afterend", this.year.element);

        this.years = new Years((val)=>this.trigger(new Date(val, this.current.getMonth())), this.options);
        this.controls.push(this.years);
        this.year.element.appendChild(this.years.element);
        this.year.expand();
    }

}
