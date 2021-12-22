/**
 * calendar display module
 *
 */
import formatter from "./display/formatter.js";
import { templateBuilder } from "./display/template.js";
import Factory from "./display/factory.js";
import { container } from "./util.js";

/**
 * class to manage the calendar
 */
export default class{
    /**
     * @param Object options 
     * @param Object templates
     */
    constructor(options, templates){
        let fmt = options.formatter?options.formatter: new formatter(options.locale);
        this.factory = new Factory(options.first_dow, fmt.key);
        this.builder = templateBuilder(templates, fmt);
        this.element = container("display");
        this.unit = options.unit;
        this.display_interval = options.display_interval;
        this.current = null;
    }

    /**
     * @param Date dt 
     */
    move(dt){
        let unit, detail = {};
        switch (this.unit){
            case "year":
            case "month":
            case "week":
                unit = this.factory[this.unit](dt);
                break;
            case "datepicker":
                unit = this.factory.month(dt);
                break;
            case "agenda":
                unit = this.factory.agenda(dt, this.display_interval);
                break;
        }
        this.builder.display(unit);
        if(this.current){
            this.current.parentNode.removeChild(this.current);
        }
        this.current = unit.container;
        this.element.appendChild(this.current);

        detail.from = new Date(unit.firstUnit());
        detail.to = new Date(unit.lastUnit());
        return detail;
    }

    /**
     * find a specific day object
     * @see src/display/unit.js
     * @param Date dt
     */
    find(dt){
        return this.factory.find(dt);
    }
}
