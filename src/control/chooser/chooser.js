/**
 * chooser control 
 * accepts an array of values for choices
 * and callback function is called with two arguments, first is the value, second is the index 
 *
 */
import { container } from "../../util.js";

export default class{
    /**
     * @param Array targets
     * @param Function callback 
     */
    constructor(targets, callback){
        let el, ch = document.createElement("ul");
        this.element = container("chooser");
        this.element.appendChild(ch);
        this.chooser = ch;

        targets.forEach((val)=>{
            el = document.createElement("li");
            el.textContent = val;
            ch.appendChild(el);
        });
        this.chooser.addEventListener("click", (e)=>{
            if(e.target.classList.contains("disabled")){
                return;
            }
            let idx = [...ch.children].indexOf(e.target);
            callback(e.target.textContent, idx);
        });
    }
}
