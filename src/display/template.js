/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "build" }]*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/**
 * create template builder 
 */
let formatter;

/**
 * accepts and object of key: templates 
 *
 * @param Object templates 
 */
export function templateBuilder(templates, fmt){
    let builder = {}, build = getBuild(builder);
    formatter = fmt;
    Object.keys(templates).forEach((key)=>{
        let ev =  "build" + templates[key];
        try{
            builder[key] = eval(ev);
        }catch(e){
            console.log("Error: unable to build template '" + key + "'");
            console.log("template content is: " + templates[key]);
            throw e.message;
        }
    });
    return builder;
}

function getBuild(builder){
    return (strings, ...vals)=>{
        return (dt, noAdd = false)=>{
            let content = false, text = "";
            vals.forEach((val, i)=>{
                if(strings[i]){
                    text += strings[i];
                }

                if(val == "content"){
                    content =formatter.key(dt);
                    text += `<div class="calendar-${dt.type}-content" content-key="${content}"></div>`;
                }else if(val == "weekdays"){
                    text += weekdays(builder, dt);
                }else if(builder[val]){
                    text += builder[val](dt, true);
                }else if(formatter[val]){
                    text += formatter[val](dt);
                }else{
                    text += val;
                }
            });
            if(strings[strings.length - 1]){
                text += strings[strings.length - 1];
            }

            if(noAdd){
                return text;
            }

            dt.container.insertAdjacentHTML("beforeend", text);
            if(content){
                dt.content = dt.container.querySelector("div[content-key="+content+"]");
                if(dt.units){
                    units(builder, dt);
                }
            }
        }
    }
}

function weekdays(builder, dt){
    let ret = "";
    switch(dt.type){
        case "month":
        case "week":
            break;
        default:
            return dt.type + " is not a valid type for weekdays";
    }
    for(let x = 0; x < 7; x++){
        ret += builder.weekday(dt.units[x], true);
    }
    return ret;
}

function units(builder, dt){
    let func,
        type = dt.units[0].type;
    dt.units.forEach((unit)=>{
        func = type;
        if(dt.type == "month"){
            if(unit.getMonth() != dt.getMonth() ){
                func = "fillerday";
                unit.container.classList.add("calendar-day-filler");
            }else{
                unit.container.classList.remove("calendar-day-filler");
            }
        }
        if(!unit.isBuilt){
            builder[func](unit);
            unit.isBuilt = true;
        }
        dt.add(unit.container);
    });
}
