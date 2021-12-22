/**
 * calendar class
 */
import Control from "./control.js";
import Display from "./display.js";
import { firstDayOfWeek, firstDayOfMonth, firstDayOfYear } from "./util.js";

export default class{
    /**
     * @param Element el
     * @param Object opts see defaults.js for options 
     */
    constructor(el, opts, templates){
        let firstFunc;
        this.element = el;
        this.options = opts;
        this.templates = templates;
        switch(opts.unit){
            case "month":
                firstFunc = firstDayOfMonth;
                break;
            case "year":
                firstFunc = firstDayOfYear;
                break;
            case "week":
                firstFunc = firstDayOfWeek;
        }
        this.lower_limit = opts.min_date?firstFunc(opts.min_date):null;
        this.upper_limit = opts.max_date?firstFunc(opts.max_date):null;
        if(this.options.initialize){
            this.init();
        }
    }

    init(){
        if(this.options.controls){
            this.control = new Control(this.options, (dt)=>this.move(dt));
            this.element.appendChild(this.control.element);
        }
        this.display = new Display(this.options, this.templates);
        this.element.appendChild(this.display.element);
        this.move(this.options.initial_date);
    }

    /**
     * move to date
     *
     * @param Date dt
     */
    move(dt){
        let ev, detail;
        if(!this.validDate(dt)){
            throw "Invalid date";
        }
        this.current = new Date(dt);
        if(this.control){
            this.control.move(this.current);
        }
        detail = this.display.move(this.current);
        ev = new CustomEvent("calendar-move", {"detail": detail})
        this.element.dispatchEvent(ev);
    }

    find(dt){
        return this.display.find(dt);
    }

    validDate(dt){
        if(this.lower_limit && dt.getTime() < this.lower_limit.getTime()){
            return false;
        }
        if(this.upper_limit && dt.getTime() > this.upper_limit.getTime()){
            return false;
        }
        return true;

    }
}

