/**
 * utility functions
 */

let today;
/**
 * check if a day is today
 *
 * @param Date dt
 * @return boolean
 */
export function isToday(dt){
    let x;
    if(!today){
        x = new Date();
        today = new Date(x.getFullYear(), x.getMonth(), x.getDate());
    }
    return dt.getTime() === today.getTime();
}

/**
 * get first day of week that includes the provided date 
 *
 * @param Date dt 
 * @param Integer firstDow optional 
 *
 * @return Date
 */
export function firstDayOfWeek(dt, firstDow = 0){
    let ret = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    ret.setDate((ret.getDate()+firstDow) - ret.getDay());
    return ret;
}

/**
 * get last day of week that includes the provided date 
 *
 * @param Date dt 
 * @param Integer firstDow optional 
 *
 * @return Date
 */
export function lastDayOfWeek(dt, firstDow = 0){
    let ret = firstDayOfWeek(dt, firstDow);
    ret.setDate(ret.getDate() + 6);
    return ret;
}

/**
 * get first day of provided month
 *
 * @param Date dt
 * @return Date
 */
export function firstDayOfMonth(dt){
    let ret = new Date(dt.getFullYear(), dt.getMonth());
    return ret;
}

/**
 * get last day of provided month
 *
 * @param Date dt
 * @return Date
 */
export function lastDayOfMonth(dt){
    let ret = firstDayOfMonth(dt);
    ret.setMonth(ret.getMonth() + 1);
    ret.setDate(0);
    return ret;
}

/**
 * get first day of provided year
 *
 * @param Date dt
 * @return Date
 */
export function firstDayOfYear(dt){
    return new Date(dt.getFullYear(), 0);
}

/**
 * get last day of provided year
 *
 * @param Date dt
 * @return Date
 */
export function lastDayOfYear(dt){
    return new Date(dt.getFullYear(), 11, 31);
}

/**
 * create a container
 *
 * @param string type 
 * @return element
 */
export function container(type){
    let el = document.createElement("div");
    el.classList.add('calendar-' + type);
    return el;
}

