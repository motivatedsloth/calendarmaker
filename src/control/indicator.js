/**
 * indicator control 
 */
import {container} from "../util.js";

export default class{

    /**
     * @param String which one of "month" or "year"
     */
    constructor(which, locale = "en-US", width = "long"){
        switch(which){
            case "week":
                width = "short";
                //fall through
            case "month":
                this.formatter = new Intl.DateTimeFormat(locale, {month: width});
                //fall through
            case "year":
                break;
            default:
                throw "invalid indicator type " + which;
        }
        this.which = which;
        this.element = container("control-" + which);
        this.element.classList.add("calendar-indicator");
        this.txt = document.createElement("span");
        this.txt.classList.add(which + "-text");
        this.element.appendChild(this.txt);
    }

    /**
     * move indicator
     *
     * @param Date dt
     */
    move(dt){
        let text, endweek = new Date(dt);
        switch(this.which){
            case "week":
                endweek.setDate(dt.getDate() + 6);
                if(endweek.getFullYear() !== dt.getFullYear()){
                    text = this.formatter.format(dt) + " " + dt.getFullYear() + " - " + this.formatter.format(endweek) + " " + endweek.getFullYear();
                }else if(endweek.getMonth() !== dt.getMonth()){
                    text = this.formatter.format(dt) + " - " + this.formatter.format(endweek) + " " + endweek.getFullYear();
                }else{
                    text = this.formatter.format(dt) + " " + endweek.getFullYear();
                }
                
                break;
            case "month":
                text = this.formatter.format(dt);
                break;
            case "year":
                text = dt.getFullYear();
                break;
        }
        this.txt.textContent = text;
    }

    /**
     * add element usually a chooser
     */
    expand(){
        let expander = this.element.classList;
        document.addEventListener("click", (e)=>{
            if(e.target != this.txt){
                expander.remove("expanded");
            }else{
                expander.add("expanded");
            }
        });
    }
}
