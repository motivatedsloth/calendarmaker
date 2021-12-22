/**
 * test display module 
 *
 */

import Display from "../../src/display.js";
import templates from "../../src/templates.js";
const {test} = QUnit;

QUnit.module("main calendar display", ()=>{
    let opts = {
        first_dow: 0,
        locale: "en-US",
        unit: "month"
    }, display;
    display = new Display(opts, templates.month);

    test("main display", assert=>{
        let units, fnd, detail,
            from = new Date(2018, 6, 1),
            to = new Date(2018, 7, 4);
        assert.ok( display.element, "element found");
        detail = display.move(new Date(2018, 6, 12));
        units = display.element.querySelectorAll(".calendar-day");
        assert.equal(units.length, 35, "contents have 35 days");
        fnd = display.find(new Date(2018, 6, 10));
        assert.equal(10, fnd.container.querySelector(".calendar-date-number").textContent, "correct date number");
        assert.equal(detail.from.getTime(), from.getTime(), "first day");
        assert.equal(detail.to.getTime(), to.getTime(), "last day");
        
    });
})
