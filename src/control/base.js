/**
 * base control class extended for year, month and week 
 */
import {container, firstDayOfWeek, firstDayOfMonth, firstDayOfYear} from "../util.js";
import Incrementor from "./incrementor.js";

export default class{

    /**
     * @param Object options
     * @param Object pt container object
     */
    constructor(options, callback){
        this.options = options;
        this.callback = callback;
        this.controls = [];
        this.element = container("controls");
        this.element.classList.add("control-" + options.unit);

        switch(options.unit){
            case "week":
                this.firstFunc = firstDayOfWeek;
                break;
            case "month":
                this.firstFunc = firstDayOfMonth;
                break;
            case "year":
                this.firstFunc = firstDayOfYear;
                break;
        }

        this.lower_limit = options.min_date?this.firstFunc(options.min_date):null;
        this.upper_limit = options.max_date?this.firstFunc(options.max_date):null;

        this.init();
    }

    /**
     * add controls to container
     */
    init(){
        this.prev = new Incrementor("prev", 
            ()=>this.increment(-1), 
            this.lower_limit);
        this.controls.push(this.prev);
        this.element.appendChild(this.prev.element);

        this.next = new Incrementor("next", 
            ()=>this.increment(1), 
            this.upper_limit);
        this.controls.push(this.next);
        this.element.appendChild(this.next.element);
    }

    /**
     * move to unit with provided date 
     *
     * @param Date dt
     * @throws if date is past set limits
     */
    move(dt){
        let to;
        to = this.firstFunc(dt);
        if((this.lower_limit && to < this.lower_limit)
            || (this.upper_limit && to > this.upper_limit)
        ){
            throw "Attempt to move past limit";
        }
        this.current = to;
        this.controls.forEach((ctl)=>ctl.move(new Date(this.current)));
    }

    /**
     * trigger move by num units
     *
     * @param Integer num 
     */
    increment(num){
        let dt = new Date(this.current);
        switch (this.options.unit){
            case "week":
                dt.setDate(dt.getDate() + (num * 7));
                break;
            case "month":
                dt.setMonth(dt.getMonth() + num);
                break;
            case "year":
                dt.setFullYear(dt.getFullYear() + num);
                break;
        }
        this.trigger(dt);
    }

    /**
     * trigger request to move to a date
     *
     * @param Date dt 
     */
    trigger(dt){
        this.callback(dt);
    }
}
