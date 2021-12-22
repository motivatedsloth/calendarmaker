/**
 * control for month calendars
 */

import Year from "./year.js";
import Indicator from "./indicator.js";
import Months from "./chooser/months.js";

export default class extends Year{

    /**
     * build control
     */
    init(){
        super.init();
        this.month = new Indicator("month");
        this.prev.element.insertAdjacentElement("afterend", this.month.element);
        this.controls.push(this.month);
        
        this.months = new Months((val, idx)=>this.trigger(new Date(this.current.getFullYear(), idx)), this.options);
        this.month.element.appendChild(this.months.element);
        this.month.expand();
    }
}
