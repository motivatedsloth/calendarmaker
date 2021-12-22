/**
 * calendar controls 
 */
import Month from "./control/month.js";
import Year from "./control/year.js";
import Week from "./control/week.js";

export default class{

    constructor(options, callback){
        switch(options.unit){
            case "month":
                this.control = new Month(options, callback);
                break;
            case "year":
                this.control = new Year(options, callback);
                break;
            case "week":
                this.control = new Week(options, callback);
                break;
        }
        this.element = this.control.element;
    }

    move(dt){
        this.control.move(dt);
    }
}
