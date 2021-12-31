/**
 * unit for building calendar
 * type can be year, month, week, agenda 
 */
export default class Unit extends Date{
    constructor(...args){
        super(...args);
        /** @var String **/
        this.type = false; 
        /** @var Element */
        this.container = false;
        /** @var Element */
        this.content = false;
    }

    /**
     * array of sub units
     * @param Unit 
     */
    addUnit(unit){
        if(!this.units){
            this.units = [];
        }
        this.units.push(unit);
    }

    firstUnit(){
        if(this.type == "year"){
            return this.units[0].firstUnit();
        }
        return this.units[0];
    }

    lastUnit(){
        if(this.type == "year"){
            return this.units[this.units.length -1].firstUnit();
        }
        return this.units[this.units.length -1];
    }

    add(el){
        if(!this.content){
            throw 'cannot add, template does not include a {"content"} block';
        }
        this.container.classList.remove("calendar-day-empty");
        return this.content.appendChild(el);
    }

    remove(el){
        let ret;
        ret = this.content.removeChild(el);
        if(0 == ret.length){
            this.container.classList.add("calendar-day-empty");
        }
        return this.content.removeChild(el);
    }
}
