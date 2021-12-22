/**
 * base class for calendar display
 *
 */
import { firstDayOfWeek } from "../util.js";

export default class{
    /**
     * 
     * @param Date dt date to display 
     * @param Object pt parent container object 
     * @param int firstDow 
     */
    constructor(dt, pt, options){
        this.dt = dt;
        this.pt = pt;
        this.options = options;
        this.build();
    }

    /**
     * add day to map
     *
     * @param Day day day object 
     */
    day(day){
        this.pt.day(day);
    }
    
    /**
     * get array of day names for locale
     */
    static getDays(locale, width = "long"){
        let dt = firstDayOfWeek(new Date()),
            ret = [],
            fmt = new Intl.DateTimeFormat(locale, {weekday: width});
        do{
            ret.push(fmt.format(dt));
            dt.setDate(dt.getDate() + 1);
        }while(dt.getDay() != 0);
        return ret;
    }

}
