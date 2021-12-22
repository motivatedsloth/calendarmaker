/**
 * incrementor control 
 */
import {container} from "../util.js";

export default class{

    /**
     * @param String which one of "prev" or "next"
     * @param Function callback function to call on click
     * @param Date limit optional date to disable incrementor
     */
    constructor(which, callback, limit = null){
        let me = this;
        switch(which){
            case "prev":
            case "next":
                break;
            default:
                throw "invalid incrementor type " + which;
        }
        this.type = which;
        this.limit = limit;
        this.disabled = false;
        this.element = container("control-" + which);
        this.element.appendChild(document.createElement("span")).textContent = "";
        this.element.addEventListener("click", e=>{
            if(me.disabled){
                return;
            }else{
                callback(e);
            }

        });
    }

    /**
     * move incrementor
     *
     * @param Date dt
     */
    move(dt){
        if(!this.limit){
            return;
        }
        this.disabled = this.type == "prev"? dt <= this.limit : dt >= this.limit;
        if(this.disabled){
            this.element.classList.add("disabled");
        }else{
            this.element.classList.remove("disabled");
        }
    }
}
