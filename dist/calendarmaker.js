var CalendarMaker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/calendarmaker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calendar.js":
/*!*************************!*\
  !*** ./src/calendar.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control.js */ \"./src/control.js\");\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display.js */ \"./src/display.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n/**\n * calendar class\n */\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n    /**\n     * @param Element el\n     * @param Object opts see defaults.js for options \n     */\n    constructor(el, opts, templates){\n        let firstFunc;\n        this.element = el;\n        this.options = opts;\n        this.templates = templates;\n        switch(opts.unit){\n            case \"month\":\n                firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_2__[\"firstDayOfMonth\"];\n                break;\n            case \"year\":\n                firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_2__[\"firstDayOfYear\"];\n                break;\n            case \"week\":\n                firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_2__[\"firstDayOfWeek\"];\n        }\n        this.lower_limit = opts.min_date?firstFunc(opts.min_date):null;\n        this.upper_limit = opts.max_date?firstFunc(opts.max_date):null;\n        if(this.options.initialize){\n            this.init();\n        }\n    }\n\n    init(){\n        if(this.options.controls){\n            this.control = new _control_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.options, (dt)=>this.move(dt));\n            this.element.appendChild(this.control.element);\n        }\n        this.display = new _display_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.options, this.templates);\n        this.element.appendChild(this.display.element);\n        this.move(this.options.initial_date);\n    }\n\n    /**\n     * move to date\n     *\n     * @param Date dt\n     */\n    move(dt){\n        let ev, detail;\n        this.current = new Date(dt);\n        if(!this.validDate(dt)){\n            throw \"Invalid date\";\n        }\n        if(this.control){\n            this.control.move(this.current);\n        }\n        detail = this.display.move(this.current);\n        ev = new CustomEvent(\"calendar-move\", {\"detail\": detail})\n        this.element.dispatchEvent(ev);\n    }\n\n    find(dt){\n        return this.display.find(dt);\n    }\n\n    validDate(dt){\n        if(this.lower_limit && dt.getTime() < this.lower_limit.getTime()){\n            return false;\n        }\n        if(this.upper_limit && dt.getTime() > this.upper_limit.getTime()){\n            return false;\n        }\n        return true;\n\n    }\n});\n\n\n\n//# sourceURL=webpack://CalendarMaker/./src/calendar.js?");

/***/ }),

/***/ "./src/calendarmaker.css":
/*!*******************************!*\
  !*** ./src/calendarmaker.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://CalendarMaker/./src/calendarmaker.css?");

/***/ }),

/***/ "./src/calendarmaker.js":
/*!******************************!*\
  !*** ./src/calendarmaker.js ***!
  \******************************/
/*! exports provided: year, month, week, agenda, datepicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"year\", function() { return year; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"month\", function() { return month; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"week\", function() { return week; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"agenda\", function() { return agenda; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"datepicker\", function() { return datepicker; });\n/* harmony import */ var _calendarmaker_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendarmaker.css */ \"./src/calendarmaker.css\");\n/* harmony import */ var _calendarmaker_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_calendarmaker_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults.js */ \"./src/defaults.js\");\n/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar.js */ \"./src/calendar.js\");\n/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates.js */ \"./src/templates.js\");\n/**\n * Basic Calendar Maker v0.1.1\n *\n * Copyright Constellation Web Services, LLC\n * http://www.constellationwebservices.com\n * \n * Released under the MIT license\n * https://github.com/motivatedsloth/calendarmaker/blob/master/LICENSE\n *\n */\n\n\n\n\n\n\nfunction year(el, opts = {}, temps = {}){\n    let o = Object.assign({}, _defaults_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], opts, {\"unit\": \"year\"}), //options\n        t = Object.assign({}, _templates_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].year, temps); //templates\n    return new _calendar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](getElement(el), o, t);\n}\n\n/**\n * create calendar object to display months \n *\n * @param Element el\n * @param Object opts \n *\n * @return display \n */\nfunction month(el, opts = {}, temps = {}){\n    let o = Object.assign({}, _defaults_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], opts, {\"unit\": \"month\"}), //options\n        t = Object.assign({}, _templates_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].month, temps); //templates\n    return new _calendar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](getElement(el), o, t);\n}\n\nfunction week(el, opts = {}, temps = {}){\n    let o = Object.assign({}, _defaults_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], opts, {\"unit\": \"week\"}), //options\n        t = Object.assign({}, _templates_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].week, temps); //templates\n    return new _calendar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](getElement(el), o, t);\n}\n\nfunction agenda(el, opts = {}, temps = {}){\n    let o = Object.assign({}, _defaults_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], opts, {\"unit\": \"agenda\", \"controls\": false}), //options\n        t = Object.assign({}, _templates_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].agenda, temps); //templates\n    return new _calendar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](getElement(el), o, t);\n}\n\nfunction datepicker(el, opts){\n}\n\nfunction getElement(el){\n    if(typeof el === \"string\"){\n        el = document.querySelector(el);\n    }\n    return el;\n}\n\n\n//# sourceURL=webpack://CalendarMaker/./src/calendarmaker.js?");

/***/ }),

/***/ "./src/control.js":
/*!************************!*\
  !*** ./src/control.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _control_month_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control/month.js */ \"./src/control/month.js\");\n/* harmony import */ var _control_year_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control/year.js */ \"./src/control/year.js\");\n/* harmony import */ var _control_week_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./control/week.js */ \"./src/control/week.js\");\n/**\n * calendar controls \n */\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n\n    constructor(options, callback){\n        switch(options.unit){\n            case \"month\":\n                this.control = new _control_month_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](options, callback);\n                break;\n            case \"year\":\n                this.control = new _control_year_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](options, callback);\n                break;\n            case \"week\":\n                this.control = new _control_week_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](options, callback);\n                break;\n        }\n        this.element = this.control.element;\n    }\n\n    move(dt){\n        this.control.move(dt);\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control.js?");

/***/ }),

/***/ "./src/control/base.js":
/*!*****************************!*\
  !*** ./src/control/base.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\n/* harmony import */ var _incrementor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incrementor.js */ \"./src/control/incrementor.js\");\n/**\n * base control class extended for year, month and week \n */\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n\n    /**\n     * @param Object options\n     * @param Object pt container object\n     */\n    constructor(options, callback){\n        this.options = options;\n        this.callback = callback;\n        this.controls = [];\n        this.element = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"container\"])(\"controls\");\n        this.element.classList.add(\"control-\" + options.unit);\n\n        switch(options.unit){\n            case \"week\":\n                this.firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"firstDayOfWeek\"];\n                break;\n            case \"month\":\n                this.firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"firstDayOfMonth\"];\n                break;\n            case \"year\":\n                this.firstFunc = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"firstDayOfYear\"];\n                break;\n        }\n\n        this.lower_limit = options.min_date?this.firstFunc(options.min_date):null;\n        this.upper_limit = options.max_date?this.firstFunc(options.max_date):null;\n\n        this.init();\n    }\n\n    /**\n     * add controls to container\n     */\n    init(){\n        this.prev = new _incrementor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"prev\", \n            ()=>this.increment(-1), \n            this.lower_limit);\n        this.controls.push(this.prev);\n        this.element.appendChild(this.prev.element);\n\n        this.next = new _incrementor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"next\", \n            ()=>this.increment(1), \n            this.upper_limit);\n        this.controls.push(this.next);\n        this.element.appendChild(this.next.element);\n    }\n\n    /**\n     * move to unit with provided date \n     *\n     * @param Date dt\n     * @throws if date is past set limits\n     */\n    move(dt){\n        let to;\n        to = this.firstFunc(dt);\n        if((this.lower_limit && to < this.lower_limit)\n            || (this.upper_limit && to > this.upper_limit)\n        ){\n            throw \"Attempt to move past limit\";\n        }\n        this.current = to;\n        this.controls.forEach((ctl)=>ctl.move(new Date(this.current)));\n    }\n\n    /**\n     * trigger move by num units\n     *\n     * @param Integer num \n     */\n    increment(num){\n        let dt = new Date(this.current);\n        switch (this.options.unit){\n            case \"week\":\n                dt.setDate(dt.getDate() + (num * 7));\n                break;\n            case \"month\":\n                dt.setMonth(dt.getMonth() + num);\n                break;\n            case \"year\":\n                dt.setFullYear(dt.getFullYear() + num);\n                break;\n        }\n        this.trigger(dt);\n    }\n\n    /**\n     * trigger request to move to a date\n     *\n     * @param Date dt \n     */\n    trigger(dt){\n        this.callback(dt);\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/base.js?");

/***/ }),

/***/ "./src/control/chooser/chooser.js":
/*!****************************************!*\
  !*** ./src/control/chooser/chooser.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util.js */ \"./src/util.js\");\n/**\n * chooser control \n * accepts an array of values for choices\n * and callback function is called with two arguments, first is the value, second is the index \n *\n */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n    /**\n     * @param Array targets\n     * @param Function callback \n     */\n    constructor(targets, callback){\n        let el, ch = document.createElement(\"ul\");\n        this.element = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"container\"])(\"chooser\");\n        this.element.appendChild(ch);\n        this.chooser = ch;\n\n        targets.forEach((val)=>{\n            el = document.createElement(\"li\");\n            el.textContent = val;\n            ch.appendChild(el);\n        });\n        this.chooser.addEventListener(\"click\", (e)=>{\n            if(e.target.classList.contains(\"disabled\")){\n                return;\n            }\n            let idx = [...ch.children].indexOf(e.target);\n            callback(e.target.textContent, idx);\n        });\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/chooser/chooser.js?");

/***/ }),

/***/ "./src/control/chooser/months.js":
/*!***************************************!*\
  !*** ./src/control/chooser/months.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Months; });\n/* harmony import */ var _chooser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chooser.js */ \"./src/control/chooser/chooser.js\");\n/**\n * month chooser control \n *\n */\n\n\nclass Months extends _chooser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    /**\n     * @param Function callback @see ./chooser.js\n     * @param Object options\n     */\n    constructor(callback, options){\n        super(Months.getMonths(options.locale), callback);\n        this.options = options;\n        this.months = [...this.chooser.children];\n        this.move(options.initial_date);\n    }\n\n    move(dt){\n        let lower = this.options.min_date,\n            upper = this.options.max_date;\n        this.months.forEach((el, idx)=>{\n            if(\n                lower\n                && lower.getFullYear() == dt.getFullYear()\n                && idx < lower.getMonth()\n            ){\n                el.classList.add(\"disabled\");\n            }else if(\n                upper\n                && upper.getFullYear() == dt.getFullYear()\n                && idx > upper.getMonth()\n            ){\n                el.classList.add(\"disabled\");\n            }else{\n                el.classList.remove(\"disabled\");\n            }\n        });\n    }\n\n    /**\n     * get array of month names for given locale\n     *\n     * @param String \"narrow\", \"short\", \"long\" see Intl.DateTimeFormat\n     */\n    static getMonths(locale = \"en-US\", width = \"long\"){\n        let dt = new Date(2018, 0, 1),\n            ret = [],\n            fmt = new Intl.DateTimeFormat(locale, {month: width});\n        for(let x = 0; x < 12; x++){\n            dt.setMonth(x);\n            ret.push(fmt.format(dt));\n        }\n        return ret;\n    }\n}\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/chooser/months.js?");

/***/ }),

/***/ "./src/control/chooser/years.js":
/*!**************************************!*\
  !*** ./src/control/chooser/years.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Years; });\n/* harmony import */ var _chooser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chooser.js */ \"./src/control/chooser/chooser.js\");\n/**\n * year chooser control \n *\n */\n\n\nclass Years extends _chooser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    /**\n     * @param Function callback @see ./chooser.js\n     * @param Object options\n     */\n    constructor(callback, options){\n        super([], callback);\n        this.options = options;\n        this.move(options.initial_date);\n    }\n\n    move(dt){\n        [...this.chooser.children].forEach((el)=>el.parentNode.removeChild(el));\n        Years.getYears(this.options, dt).forEach((val)=>{\n            let el;\n            el = document.createElement(\"li\");\n            el.textContent = val;\n            this.chooser.appendChild(el);\n        });\n    }\n\n    /**\n     * get array of years for chooser\n     *\n     * @param Object options\n     * @param Date dt\n     */\n    static getYears(options, dt){\n        let phmin = dt.getFullYear(),\n            phmax = phmin,\n            ret = [phmin] ,\n            minYear,\n            maxYear,\n            added;\n\n        if(options.min_date){\n            minYear = options.min_date.getFullYear();\n        }else{\n            minYear = 0;\n        }\n        \n        if(options.max_date){\n            maxYear = options.max_date.getFullYear();\n        }else{\n            maxYear = 10000;\n        }\n        \n        for(; ret.length < options.number_of_years;){\n            added = false;\n            phmin--;\n            phmax++;\n            if(phmin >= minYear){\n                ret.unshift(phmin);\n                added = true;\n            } \n            if(phmax <= maxYear && ret.length < options.number_of_years){\n                ret.push(phmax);\n                added = true;\n            }        \n            if(!added){\n                break;\n            }\n        }\n        return ret;\n    }\n}\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/chooser/years.js?");

/***/ }),

/***/ "./src/control/incrementor.js":
/*!************************************!*\
  !*** ./src/control/incrementor.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\n/**\n * incrementor control \n */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n\n    /**\n     * @param String which one of \"prev\" or \"next\"\n     * @param Function callback function to call on click\n     * @param Date limit optional date to disable incrementor\n     */\n    constructor(which, callback, limit = null){\n        let me = this;\n        switch(which){\n            case \"prev\":\n            case \"next\":\n                break;\n            default:\n                throw \"invalid incrementor type \" + which;\n        }\n        this.type = which;\n        this.limit = limit;\n        this.disabled = false;\n        this.element = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"container\"])(\"control-\" + which);\n        this.element.appendChild(document.createElement(\"span\")).textContent = \"\";\n        this.element.addEventListener(\"click\", e=>{\n            if(me.disabled){\n                return;\n            }else{\n                callback(e);\n            }\n\n        });\n    }\n\n    /**\n     * move incrementor\n     *\n     * @param Date dt\n     */\n    move(dt){\n        if(!this.limit){\n            return;\n        }\n        this.disabled = this.type == \"prev\"? dt <= this.limit : dt >= this.limit;\n        if(this.disabled){\n            this.element.classList.add(\"disabled\");\n        }else{\n            this.element.classList.remove(\"disabled\");\n        }\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/incrementor.js?");

/***/ }),

/***/ "./src/control/indicator.js":
/*!**********************************!*\
  !*** ./src/control/indicator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\n/**\n * indicator control \n */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n\n    /**\n     * @param String which one of \"month\" or \"year\"\n     */\n    constructor(which, locale = \"en-US\", width = \"long\"){\n        switch(which){\n            case \"week\":\n                width = \"short\";\n                //fall through\n            case \"month\":\n                this.formatter = new Intl.DateTimeFormat(locale, {month: width});\n                //fall through\n            case \"year\":\n                break;\n            default:\n                throw \"invalid indicator type \" + which;\n        }\n        this.which = which;\n        this.element = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"container\"])(\"control-\" + which);\n        this.element.classList.add(\"calendar-indicator\");\n        this.txt = document.createElement(\"span\");\n        this.txt.classList.add(which + \"-text\");\n        this.element.appendChild(this.txt);\n    }\n\n    /**\n     * move indicator\n     *\n     * @param Date dt\n     */\n    move(dt){\n        let text, endweek = new Date(dt);\n        switch(this.which){\n            case \"week\":\n                endweek.setDate(dt.getDate() + 6);\n                if(endweek.getFullYear() !== dt.getFullYear()){\n                    text = this.formatter.format(dt) + \" \" + dt.getFullYear() + \" - \" + this.formatter.format(endweek) + \" \" + endweek.getFullYear();\n                }else if(endweek.getMonth() !== dt.getMonth()){\n                    text = this.formatter.format(dt) + \" - \" + this.formatter.format(endweek) + \" \" + endweek.getFullYear();\n                }else{\n                    text = this.formatter.format(dt) + \" \" + endweek.getFullYear();\n                }\n                \n                break;\n            case \"month\":\n                text = this.formatter.format(dt);\n                break;\n            case \"year\":\n                text = dt.getFullYear();\n                break;\n        }\n        this.txt.textContent = text;\n    }\n\n    /**\n     * add element usually a chooser\n     */\n    expand(){\n        let expander = this.element.classList;\n        document.addEventListener(\"click\", (e)=>{\n            if(e.target != this.txt){\n                expander.remove(\"expanded\");\n            }else{\n                expander.add(\"expanded\");\n            }\n        });\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/indicator.js?");

/***/ }),

/***/ "./src/control/month.js":
/*!******************************!*\
  !*** ./src/control/month.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _year_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./year.js */ \"./src/control/year.js\");\n/* harmony import */ var _indicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indicator.js */ \"./src/control/indicator.js\");\n/* harmony import */ var _chooser_months_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chooser/months.js */ \"./src/control/chooser/months.js\");\n/**\n * control for month calendars\n */\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends _year_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n\n    /**\n     * build control\n     */\n    init(){\n        super.init();\n        this.month = new _indicator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"month\");\n        this.prev.element.insertAdjacentElement(\"afterend\", this.month.element);\n        this.controls.push(this.month);\n        \n        this.months = new _chooser_months_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]((val, idx)=>this.trigger(new Date(this.current.getFullYear(), idx)), this.options);\n        this.month.element.appendChild(this.months.element);\n        this.month.expand();\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/month.js?");

/***/ }),

/***/ "./src/control/week.js":
/*!*****************************!*\
  !*** ./src/control/week.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/control/base.js\");\n/* harmony import */ var _indicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indicator.js */ \"./src/control/indicator.js\");\n/**\n * control for week calendars\n */\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends _base_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n\n    /**\n     * build control\n     */\n    init(){\n        super.init();\n        this.week = new _indicator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"week\");\n        this.controls.push(this.week);\n        this.prev.element.insertAdjacentElement(\"afterend\", this.week.element);\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/week.js?");

/***/ }),

/***/ "./src/control/year.js":
/*!*****************************!*\
  !*** ./src/control/year.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/control/base.js\");\n/* harmony import */ var _indicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indicator.js */ \"./src/control/indicator.js\");\n/* harmony import */ var _chooser_years_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chooser/years.js */ \"./src/control/chooser/years.js\");\n/**\n * control for year calendars\n */\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends _base_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n\n    /**\n     * build control\n     */\n    init(){\n        super.init();\n        this.year = new _indicator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"year\");\n        this.controls.push(this.year);\n        this.prev.element.insertAdjacentElement(\"afterend\", this.year.element);\n\n        this.years = new _chooser_years_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]((val)=>this.trigger(new Date(val, this.current.getMonth())), this.options);\n        this.controls.push(this.years);\n        this.year.element.appendChild(this.years.element);\n        this.year.expand();\n    }\n\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/control/year.js?");

/***/ }),

/***/ "./src/defaults.js":
/*!*************************!*\
  !*** ./src/defaults.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    \"unit\": \"month\", //one of year, month, week, agenda\n    \"initial_date\": new Date(),\n    \"min_date\": null, // Date object of first possible date to select\n    \"max_date\": null, // Date object of last possible date to select\n    \"number_of_years\": 10, // number of years to show in chooser\n    \"controls\": true, //show controls or not true for year, month, week; always false for agenda\n    \"display_interval\": 14, //days to show in agenda view\n    \"initialize\": true, //true creates calendar in constructor\n    \"locale\": \"en-US\", // for month and day names\n    \"first_dow\": 0, //0 = sunday, 1 = monday\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/defaults.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display_formatter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display/formatter.js */ \"./src/display/formatter.js\");\n/* harmony import */ var _display_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display/template.js */ \"./src/display/template.js\");\n/* harmony import */ var _display_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display/factory.js */ \"./src/display/factory.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n/**\n * calendar display module\n *\n */\n\n\n\n\n\n/**\n * class to manage the calendar\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n    /**\n     * @param Object options \n     * @param Object templates\n     */\n    constructor(options, templates){\n        let fmt = options.formatter?options.formatter: new _display_formatter_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](options.locale);\n        this.factory = new _display_factory_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](options.first_dow, fmt.key);\n        this.builder = Object(_display_template_js__WEBPACK_IMPORTED_MODULE_1__[\"templateBuilder\"])(templates, fmt);\n        this.element = Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"container\"])(\"display\");\n        this.unit = options.unit;\n        this.display_interval = options.display_interval;\n        this.current = null;\n    }\n\n    /**\n     * @param Date dt \n     */\n    move(dt){\n        let unit, detail = {};\n        switch (this.unit){\n            case \"year\":\n            case \"month\":\n            case \"week\":\n                unit = this.factory[this.unit](dt);\n                break;\n            case \"datepicker\":\n                unit = this.factory.month(dt);\n                break;\n            case \"agenda\":\n                unit = this.factory.agenda(dt, this.display_interval);\n                break;\n        }\n        this.builder.display(unit);\n        if(this.current){\n            this.current.parentNode.removeChild(this.current);\n        }\n        this.current = unit.container;\n        this.element.appendChild(this.current);\n\n        detail.from = new Date(unit.firstUnit());\n        detail.to = new Date(unit.lastUnit());\n        return detail;\n    }\n\n    /**\n     * find a specific day object\n     * @see src/display/unit.js\n     * @param Date dt\n     */\n    find(dt){\n        return this.factory.find(dt);\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/display.js?");

/***/ }),

/***/ "./src/display/factory.js":
/*!********************************!*\
  !*** ./src/display/factory.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unit.js */ \"./src/display/unit.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\n/**\n * display unit factory\n */\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n    /**\n     *\n     * @param {integer} firstDow first day of week, 0 for sunday, 1 for monday\n     * @param {function} keygen function to generate a key for a unit object\n     * @param {function} callback options function to call when a day is created\n     */\n    constructor(firstDow = 0, keygen,  callback = ()=>{}){\n        this.firstDow = firstDow;\n        this.keygen = keygen;\n        this.callback = callback;\n        this.cache = new Map;\n    }\n\n    /**\n     * get day unit \n     *\n     * @param Date dt \n     * @param boolean cache if false do not cache this day \n     */\n    day(dt, cache = true){\n        let d;\n        if(cache){\n            d = this.find(dt);\n        }\n        if(!d){\n            d = new _unit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](dt);\n            this.configure(d, \"day\");\n            if(cache){\n                this.cache.set(d.key, d);\n            }\n            this.callback(d);\n        }\n        return d;\n    }\n\n    week(dt){\n        let w = new _unit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfWeek\"])(dt)),\n            fd = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfWeek\"])(w, this.firstDow),\n            ld = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"lastDayOfWeek\"])(w, this.firstDow);\n        this.configure(w, \"week\");\n        for(; fd.getTime() <= ld.getTime(); fd.setDate(fd.getDate() + 1)){\n            w.addUnit(this.day(fd));\n        }\n        this.callback(w);\n        return w;\n\n    }\n\n    agenda(dt, display_interval){\n        let a = new _unit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](dt),\n            ph = new Date(dt);\n        this.configure(a, \"agenda\");\n        for(; display_interval > 0; display_interval--){\n            a.addUnit(this.day(ph));\n            ph.setDate(ph.getDate() + 1);\n        }\n        this.callback(a);\n        return a;\n    }\n\n    month(dt, cachefiller = true){\n        let m = new _unit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfMonth\"])(dt)),\n            fd = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfWeek\"])(m, this.firstDow),\n            ld = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"lastDayOfWeek\"])(Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"lastDayOfMonth\"])(m)),\n            cache = true;\n        this.configure(m, \"month\");\n        for(;fd.getTime() <= ld.getTime();fd.setDate(fd.getDate() + 1)){\n            if(!cachefiller){\n                cache = dt.getMonth() === fd.getMonth();\n            }\n            m.addUnit(this.day(fd, cache));\n        }\n        this.callback(m);\n        return m;\n    }\n\n    year(dt){\n        let y = new _unit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfYear\"])(dt)),\n            fm = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"firstDayOfYear\"])(y);\n        this.configure(y, \"year\");\n\n        for(; fm.getFullYear() == y.getFullYear(); fm.setMonth(fm.getMonth() + 1)){\n            y.addUnit(this.month(fm, false));\n        }\n        this.callback(y);\n        return y;\n    }\n\n    configure(dt, type){\n        dt.type = type;\n        dt.key = this.keygen(dt);\n\n        dt.container = document.createElement(\"div\");\n        dt.container.classList.add(\"calendar-\" + type);\n        if(type == \"day\"){\n            dt.container.classList.add(\"calendar-day-empty\");\n            if(Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"isToday\"])(dt)){\n                dt.container.classList.add(\"today\");\n            }\n        }\n    }\n\n    find(dt){\n        return this.cache.get(this.keygen(dt));\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/display/factory.js?");

/***/ }),

/***/ "./src/display/formatter.js":
/*!**********************************!*\
  !*** ./src/display/formatter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * date formatter \n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class{\n    constructor(locale){\n        this.formatters = {};\n        this.locale = locale;\n    }\n\n    longday(dt){\n        if(!this.formatters.longday){\n            this.formatters.longday = new Intl.DateTimeFormat(this.locale, {weekday:\"long\"}).format;\n        }\n        return this.formatters.longday(dt);\n    }\n\n    shortday(dt){\n        if(!this.formatters.shortday){\n            this.formatters.shortday = new Intl.DateTimeFormat(this.locale, {weekday:\"short\"}).format;\n        }\n        return this.formatters.shortday(dt);\n    }\n\n    narrowday(dt){\n        if(!this.formatters.narrowday){\n            this.formatters.narrowday = new Intl.DateTimeFormat(this.locale, {weekday:\"narrow\"}).format;\n        }\n        return this.formatters.narrowday(dt);\n    }\n\n    longmonth(dt){\n        if(!this.formatters.longmonth){\n            this.formatters.longmonth = new Intl.DateTimeFormat(this.locale, {month:\"long\"}).format;\n        }\n        return this.formatters.longmonth(dt);\n    }\n\n    shortmonth(dt){\n        if(!this.formatters.shortmonth){\n            this.formatters.shortmonth = new Intl.DateTimeFormat(this.locale, {month:\"short\"}).format;\n        }\n        return this.formatters.shortmonth(dt);\n    }\n\n    narrowmonth(dt){\n        if(!this.formatters.narrowmonth){\n            this.formatters.narrowmonth = new Intl.DateTimeFormat(this.locale, {month:\"narrow\"}).format;\n        }\n        return this.formatters.narrowmonth(dt);\n    }\n\n    key(dt){\n        return (dt.type?dt.type:\"day\") + \"-\" + dt.getFullYear() + \"-\" + dt.getMonth() + \"-\" + dt.getDate();\n    }\n\n    date(dt){\n        return dt.getDate();\n    }\n\n    year(dt){\n        return dt.getFullYear();\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/display/formatter.js?");

/***/ }),

/***/ "./src/display/template.js":
/*!*********************************!*\
  !*** ./src/display/template.js ***!
  \*********************************/
/*! exports provided: templateBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"templateBuilder\", function() { return templateBuilder; });\n/*eslint no-unused-vars: [\"error\", { \"varsIgnorePattern\": \"build\" }]*/\n/*eslint no-console: [\"error\", { allow: [\"log\"] }] */\n/**\n * create template builder \n */\nlet formatter;\n\n/**\n * accepts and object of key: templates \n *\n * @param Object templates \n */\nfunction templateBuilder(templates, fmt){\n    let builder = {}, build = getBuild(builder);\n    formatter = fmt;\n    Object.keys(templates).forEach((key)=>{\n        let ev =  \"build\" + templates[key];\n        try{\n            builder[key] = eval(ev);\n        }catch(e){\n            console.log(\"Error: unable to build template '\" + key + \"'\");\n            console.log(\"template content is: \" + templates[key]);\n            throw e.message;\n        }\n    });\n    return builder;\n}\n\nfunction getBuild(builder){\n    return (strings, ...vals)=>{\n        return (dt, noAdd = false)=>{\n            let content = false, text = \"\";\n            vals.forEach((val, i)=>{\n                if(strings[i]){\n                    text += strings[i];\n                }\n\n                if(val == \"content\"){\n                    content =formatter.key(dt);\n                    text += `<div class=\"calendar-${dt.type}-content\" content-key=\"${content}\"></div>`;\n                }else if(val == \"weekdays\"){\n                    text += weekdays(builder, dt);\n                }else if(builder[val]){\n                    text += builder[val](dt, true);\n                }else if(formatter[val]){\n                    text += formatter[val](dt);\n                }else{\n                    text += val;\n                }\n            });\n            if(strings[strings.length - 1]){\n                text += strings[strings.length - 1];\n            }\n\n            if(noAdd){\n                return text;\n            }\n\n            dt.container.insertAdjacentHTML(\"beforeend\", text);\n            if(content){\n                dt.content = dt.container.querySelector(\"div[content-key=\"+content+\"]\");\n                if(dt.units){\n                    units(builder, dt);\n                }\n            }\n        }\n    }\n}\n\nfunction weekdays(builder, dt){\n    let ret = \"\";\n    switch(dt.type){\n        case \"month\":\n        case \"week\":\n            break;\n        default:\n            return dt.type + \" is not a valid type for weekdays\";\n    }\n    for(let x = 0; x < 7; x++){\n        ret += builder.weekday(dt.units[x], true);\n    }\n    return ret;\n}\n\nfunction units(builder, dt){\n    let func,\n        type = dt.units[0].type;\n    dt.units.forEach((unit)=>{\n        func = type;\n        if(dt.type == \"month\"){\n            if(unit.getMonth() != dt.getMonth() ){\n                func = \"fillerday\";\n                unit.container.classList.add(\"calendar-day-filler\");\n            }else{\n                unit.container.classList.remove(\"calendar-day-filler\");\n            }\n        }\n        if(!unit.isBuilt){\n            builder[func](unit);\n            unit.isBuilt = true;\n        }\n        dt.content.insertAdjacentElement(\"beforeend\", unit.container);\n    });\n}\n\n\n//# sourceURL=webpack://CalendarMaker/./src/display/template.js?");

/***/ }),

/***/ "./src/display/unit.js":
/*!*****************************!*\
  !*** ./src/display/unit.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Unit; });\n/**\n * unit for building calendar\n * type can be year, month, week, agenda \n */\nclass Unit extends Date{\n    constructor(...args){\n        super(...args);\n        /** @var String **/\n        this.type = false; \n        /** @var Element */\n        this.container = false;\n        /** @var Element */\n        this.contents = false;\n    }\n\n    /**\n     * array of sub units\n     * @param Unit \n     */\n    addUnit(unit){\n        if(!this.units){\n            this.units = [];\n        }\n        this.units.push(unit);\n    }\n\n    firstUnit(){\n        if(this.type == \"year\"){\n            return this.units[0].firstUnit();\n        }\n        return this.units[0];\n    }\n\n    lastUnit(){\n        if(this.type == \"year\"){\n            return this.units[this.units.length -1].firstUnit();\n        }\n        return this.units[this.units.length -1];\n    }\n\n    add(el){\n        if(!this.contents){\n            throw 'cannot add, template does not include a {\"content\"} block';\n        }\n        return this.contents.appendChild(el);\n    }\n\n    remove(el){\n        return this.contents.removeChild(el);\n    }\n}\n\n\n//# sourceURL=webpack://CalendarMaker/./src/display/unit.js?");

/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    //templates for month display\n    month: {\n        day: '`<div class=\"calendar-date\"><span class=\"calendar-date-number\">${\"date\"}</span></div>${\"content\"}`',\n        weekday: '`<div class=\"calendar-weekday\"><span class=\"short\">${\"shortday\"}</span><span class=\"long\">${\"longday\"}</span></div>`',\n        fillerday: '`${\"day\"}`',\n        header: '`<div class=\"calendar-header\">${\"weekdays\"}</div>`',\n        display: '`${\"header\"}${\"content\"}`'\n    },\n\n    year: {\n        day: '`<div class=\"calendar-date\"><span class=\"calendar-date-number\">${\"date\"}</span></div>`',\n        fillerday: '`<div class=\"calendar-day calendar-day-filler\"></div>`',\n        weekday: '`<div class=\"calendar-weekday\">${\"narrowday\"}</div>`',\n        monthheader: '`<div class=\"calendar-month-name\">${\"longmonth\"}</div><div class=\"calendar-header\">${\"weekdays\"}</div>`',\n        month: '`${\"monthheader\"}${\"content\"}`',\n        display: '`${\"content\"}`'\n    },\n\n    week: {\n        day: '`<div class=\"calendar-date\"><span class=\"calendar-date-string short\">${\"narrowday\"}</span><span class=\"calendar-date-string long\">${\"shortday\"}</span> <span class=\"calendar-date-number\">${\"date\"}</span></div>${\"content\"}`',\n        display: '`${\"content\"}`'\n    },\n\n    agenda: {\n        day: '`<div class=\"calendar-date\"><span class=\"calendar-date-string\">${\"shortday\"} ${\"shortmonth\"}</span> <span class=\"calendar-date-number\">${\"date\"}</span></div>${\"content\"}`',\n        display: '`${\"content\"}`'\n    }\n});\n\n\n//# sourceURL=webpack://CalendarMaker/./src/templates.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: isToday, firstDayOfWeek, lastDayOfWeek, firstDayOfMonth, lastDayOfMonth, firstDayOfYear, lastDayOfYear, container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isToday\", function() { return isToday; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firstDayOfWeek\", function() { return firstDayOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lastDayOfWeek\", function() { return lastDayOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firstDayOfMonth\", function() { return firstDayOfMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lastDayOfMonth\", function() { return lastDayOfMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firstDayOfYear\", function() { return firstDayOfYear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lastDayOfYear\", function() { return lastDayOfYear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"container\", function() { return container; });\n/**\n * utility functions\n */\n\nlet today;\n/**\n * check if a day is today\n *\n * @param Date dt\n * @return boolean\n */\nfunction isToday(dt){\n    let x;\n    if(!today){\n        x = new Date();\n        today = new Date(x.getFullYear(), x.getMonth(), x.getDate());\n    }\n    return dt.getTime() === today.getTime();\n}\n\n/**\n * get first day of week that includes the provided date \n *\n * @param Date dt \n * @param Integer firstDow optional \n *\n * @return Date\n */\nfunction firstDayOfWeek(dt, firstDow = 0){\n    let ret = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());\n    ret.setDate((ret.getDate()+firstDow) - ret.getDay());\n    return ret;\n}\n\n/**\n * get last day of week that includes the provided date \n *\n * @param Date dt \n * @param Integer firstDow optional \n *\n * @return Date\n */\nfunction lastDayOfWeek(dt, firstDow = 0){\n    let ret = firstDayOfWeek(dt, firstDow);\n    ret.setDate(ret.getDate() + 6);\n    return ret;\n}\n\n/**\n * get first day of provided month\n *\n * @param Date dt\n * @return Date\n */\nfunction firstDayOfMonth(dt){\n    let ret = new Date(dt.getFullYear(), dt.getMonth());\n    return ret;\n}\n\n/**\n * get last day of provided month\n *\n * @param Date dt\n * @return Date\n */\nfunction lastDayOfMonth(dt){\n    let ret = firstDayOfMonth(dt);\n    ret.setMonth(ret.getMonth() + 1);\n    ret.setDate(0);\n    return ret;\n}\n\n/**\n * get first day of provided year\n *\n * @param Date dt\n * @return Date\n */\nfunction firstDayOfYear(dt){\n    return new Date(dt.getFullYear(), 0);\n}\n\n/**\n * get last day of provided year\n *\n * @param Date dt\n * @return Date\n */\nfunction lastDayOfYear(dt){\n    return new Date(dt.getFullYear(), 11, 31);\n}\n\n/**\n * create a container\n *\n * @param string type \n * @return element\n */\nfunction container(type){\n    let el = document.createElement(\"div\");\n    el.classList.add('calendar-' + type);\n    return el;\n}\n\n\n\n//# sourceURL=webpack://CalendarMaker/./src/util.js?");

/***/ })

/******/ });