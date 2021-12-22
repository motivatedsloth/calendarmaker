/**
 * test month controls
 */

import { templateBuilder } from "../../../src/display/template.js";
import formatter from "../../../src/display/formatter.js";
import Factory from "../../../src/display/factory.js";
const {test} = QUnit;

QUnit.module("Template builder", ()=>{
    let temps = {
        header: '`<div class="header">${"weekdays"}</div>`',
        weekday: '`<div class="weekday">${"shortday"}</div>`',
        display: '`${"header"}${"content"}`',
        day: '`<h2>Today is ${"longday"}</h2>`',
        fillerday: '`<h2>Filler day is ${"longday"}</h2>`',
        fail: '`is warm'
    },
        dt = new Date(2018, 5, 12),
        fmt = new formatter("en-US"),
        fct = new Factory(0,fmt.key),
        u = fct.month(dt);

    test("check build", assert=>{
        let tp, header, content, days;
        assert.throws(()=>tp = templateBuilder(temps, fmt));
        delete temps.fail;
        tp = templateBuilder(temps, fmt);
        tp.display(u);
        header = u.container.querySelector("div.header");
        content = u.container.querySelector("div.calendar-month-content");
        days = u.container.querySelectorAll("h2");

        assert.ok(header, "contains header");
        assert.ok(content, "contains content");
        assert.equal(7, header.children.length, "7 weekdays");
        assert.equal("Tue", header.children[2].textContent, "headerday");

        assert.equal(35, content.children.length, "35 days");

        assert.equal("Today is Tuesday", days[9].textContent, "day is good");
        assert.equal("Filler day is Tuesday", days[2].textContent, "day is good");
        assert.ok(u.units[1].container.classList.contains("calendar-day-filler"), "filler day class");
        
    });
})
