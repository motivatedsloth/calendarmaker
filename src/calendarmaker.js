/**
 * Basic Calendar Maker v0.1.1
 *
 * Copyright Constellation Web Services, LLC
 * http://www.constellationwebservices.com
 * 
 * Released under the MIT license
 * https://github.com/motivatedsloth/calendarmaker/blob/master/LICENSE
 *
 */
import "./calendarmaker.css";

import defOptions from "./defaults.js";
import calendar from "./calendar.js";
import templates from "./templates.js";

export function year(el, opts = {}, temps = {}){
    let o = Object.assign({}, defOptions, opts, {"unit": "year"}), //options
        t = Object.assign({}, templates.year, temps); //templates
    return new calendar(getElement(el), o, t);
}

/**
 * create calendar object to display months 
 *
 * @param Element el
 * @param Object opts 
 *
 * @return display 
 */
export function month(el, opts = {}, temps = {}){
    let o = Object.assign({}, defOptions, opts, {"unit": "month"}), //options
        t = Object.assign({}, templates.month, temps); //templates
    return new calendar(getElement(el), o, t);
}

export function week(el, opts = {}, temps = {}){
    let o = Object.assign({}, defOptions, opts, {"unit": "week"}), //options
        t = Object.assign({}, templates.week, temps); //templates
    return new calendar(getElement(el), o, t);
}

export function agenda(el, opts = {}, temps = {}){
    let o = Object.assign({}, defOptions, opts, {"unit": "agenda", "controls": false}), //options
        t = Object.assign({}, templates.agenda, temps); //templates
    return new calendar(getElement(el), o, t);
}

export function datepicker(el, opts, temps = {}){
    let o = Object.assign({}, defOptions, opts, {"unit": "month"}), //options
        t = Object.assign({}, templates.datepicker, temps); //templates
    return new calendar(getElement(el), o, t);
}

function getElement(el){
    if(typeof el === "string"){
        el = document.querySelector(el);
    }
    return el;
}
