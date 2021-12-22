/**
 * test calendar manager
 *
 */
import defaults from "../../src/defaults.js";
import templates from "../../src/templates.js";
import Calendar from "../../src/calendar.js";

const {test} = QUnit;

QUnit.module("calendar manager", ()=>{
    let calendar, 
        el = document.getElementById("qunit-fixture"),
        from, to,
        callback = (e)=>{
            from = e.detail.from;
            to = e.detail.to;
        },
        options = Object.assign({}, defaults, {min_date: new Date(2018, 2,12), initial_date: new Date(2018,5,12)});

    calendar = new Calendar(el, options, templates.month);
    el.addEventListener("calendar-move", callback);

    test("testing calendar", assert=>{
        let last = new Date(2018, 4, 12),
            cmpfrom = new Date(2018, 3, 29),
            cmpto = new Date(2018, 5, 2);
        assert.equal("June", el.querySelector(".month-text").textContent, "started at correct date");
        calendar.move(last);
        assert.equal("May", el.querySelector(".month-text").textContent, "started at correct date");
        assert.equal(cmpfrom.getTime(), from.getTime(), "detail from");
        assert.equal(cmpto.getTime(), to.getTime(), "detail to");
        assert.throws(()=>calendar.move(new Date(2018,1,1)), "past min date");
    });
})
