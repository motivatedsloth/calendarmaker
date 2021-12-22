/**
 * display unit factory
 */

import Unit from "./unit.js";
import { isToday, firstDayOfYear, firstDayOfMonth, firstDayOfWeek, lastDayOfMonth, lastDayOfWeek } from "../util.js";

export default class{
    /**
     *
     * @param {integer} firstDow first day of week, 0 for sunday, 1 for monday
     * @param {function} keygen function to generate a key for a unit object
     * @param {function} callback optional function to call when a day is created
     */
    constructor(firstDow = 0, keygen,  callback = ()=>{}){
        this.firstDow = firstDow;
        this.keygen = keygen;
        this.callback = callback;
        this.cache = new Map;
    }

    /**
     * get day unit 
     *
     * @param Date dt 
     * @param boolean cache if false do not cache this day
     * @return Unit
     */
    day(dt, cache = true){
        let d;
        if(cache){
            d = this.find(dt);
        }
        if(!d){
            d = new Unit(dt);
            this.configure(d, "day");
            if(cache){
                this.cache.set(d.key, d);
            }
            this.callback(d);
        }
        return d;
    }

    /**
     * create a populated week unit
     *
     * @param Date dt date during the desired week
     *
     * @return Unit
     */
    week(dt){
        let w = new Unit(firstDayOfWeek(dt)),
            fd = firstDayOfWeek(w, this.firstDow),
            ld = lastDayOfWeek(w, this.firstDow);
        this.configure(w, "week");
        for(; fd.getTime() <= ld.getTime(); fd.setDate(fd.getDate() + 1)){
            w.addUnit(this.day(fd));
        }
        this.callback(w);
        return w;

    }

    /**
     * create agenda view
     *
     * @param Date dt 
     * @param Integer display_interval 
     *
     * @return Unit
     */
    agenda(dt, display_interval){
        let a = new Unit(dt),
            ph = new Date(dt);
        this.configure(a, "agenda");
        for(; display_interval > 0; display_interval--){
            a.addUnit(this.day(ph));
            ph.setDate(ph.getDate() + 1);
        }
        this.callback(a);
        return a;
    }

    /**
     * create a populated month unit
     *
     * @param Date dt date within desired month
     * @param boolean cachefiller if true filler days will be cached
     *
     * @return Unit
     */
    month(dt, cachefiller = true){
        let m = new Unit(firstDayOfMonth(dt)),
            fd = firstDayOfWeek(m, this.firstDow),
            ld = lastDayOfWeek(lastDayOfMonth(m)),
            cache = true;
        this.configure(m, "month");
        for(;fd.getTime() <= ld.getTime();fd.setDate(fd.getDate() + 1)){
            if(!cachefiller){
                cache = dt.getMonth() === fd.getMonth();
            }
            m.addUnit(this.day(fd, cache));
        }
        this.callback(m);
        return m;
    }

    /**
     * create a populated year unit
     *
     * @param {Date} dt date within desired year
     *
     * @return Unit 
     */
    year(dt){
        let y = new Unit(firstDayOfYear(dt)),
            fm = firstDayOfYear(y);
        this.configure(y, "year");

        for(; fm.getFullYear() == y.getFullYear(); fm.setMonth(fm.getMonth() + 1)){
            y.addUnit(this.month(fm, false));
        }
        this.callback(y);
        return y;
    }

    /**
     * prepare and configure Unit 
     *
     * @param {Unit} dt
     * @param {string} type month, day, year, week, agenda 
     */
    configure(dt, type){
        dt.type = type;
        dt.key = this.keygen(dt);

        dt.container = document.createElement("div");
        dt.container.classList.add("calendar-" + type);
        if(type == "day"){
            dt.container.classList.add("calendar-day-empty");
            if(isToday(dt)){
                dt.container.classList.add("today");
            }
        }
    }

    /**
     * find a cached day Unit
     *
     * @param {Date} dt
     * @return Unit|undefined
     */
    find(dt){
        return this.cache.get(this.keygen(dt));
    }
}
