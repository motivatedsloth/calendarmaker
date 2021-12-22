/**
 * year chooser control 
 *
 */
import Chooser from "./chooser.js";

export default class Years extends Chooser{
    /**
     * @param Function callback @see ./chooser.js
     * @param Object options
     */
    constructor(callback, options){
        super([], callback);
        this.options = options;
        this.move(options.initial_date);
    }

    move(dt){
        [...this.chooser.children].forEach((el)=>el.parentNode.removeChild(el));
        Years.getYears(this.options, dt).forEach((val)=>{
            let el;
            el = document.createElement("li");
            el.textContent = val;
            this.chooser.appendChild(el);
        });
    }

    /**
     * get array of years for chooser
     *
     * @param Object options
     * @param Date dt
     */
    static getYears(options, dt){
        let phmin = dt.getFullYear(),
            phmax = phmin,
            ret = [phmin] ,
            minYear,
            maxYear,
            added;

        if(options.min_date){
            minYear = options.min_date.getFullYear();
        }else{
            minYear = 0;
        }
        
        if(options.max_date){
            maxYear = options.max_date.getFullYear();
        }else{
            maxYear = 10000;
        }
        
        for(; ret.length < options.number_of_years;){
            added = false;
            phmin--;
            phmax++;
            if(phmin >= minYear){
                ret.unshift(phmin);
                added = true;
            } 
            if(phmax <= maxYear && ret.length < options.number_of_years){
                ret.push(phmax);
                added = true;
            }        
            if(!added){
                break;
            }
        }
        return ret;
    }
}
