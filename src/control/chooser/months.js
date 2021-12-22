/**
 * month chooser control 
 *
 */
import Chooser from "./chooser.js";

export default class Months extends Chooser{
    /**
     * @param Function callback @see ./chooser.js
     * @param Object options
     */
    constructor(callback, options){
        super(Months.getMonths(options.locale), callback);
        this.options = options;
        this.months = [...this.chooser.children];
        this.move(options.initial_date);
    }

    move(dt){
        let lower = this.options.min_date,
            upper = this.options.max_date;
        this.months.forEach((el, idx)=>{
            if(
                lower
                && lower.getFullYear() == dt.getFullYear()
                && idx < lower.getMonth()
            ){
                el.classList.add("disabled");
            }else if(
                upper
                && upper.getFullYear() == dt.getFullYear()
                && idx > upper.getMonth()
            ){
                el.classList.add("disabled");
            }else{
                el.classList.remove("disabled");
            }
        });
    }

    /**
     * get array of month names for given locale
     *
     * @param String "narrow", "short", "long" see Intl.DateTimeFormat
     */
    static getMonths(locale = "en-US", width = "long"){
        let dt = new Date(2018, 0, 1),
            ret = [],
            fmt = new Intl.DateTimeFormat(locale, {month: width});
        for(let x = 0; x < 12; x++){
            dt.setMonth(x);
            ret.push(fmt.format(dt));
        }
        return ret;
    }
}
