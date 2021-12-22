/**
 * test month controls
 */

import Month from "../../../src/control/month.js";
const {test} = QUnit;

QUnit.module("test month", ()=>{
    let opts = {
        initial_date: new Date(2018, 6, 12),
        min_date: new Date(2013, 6, 5),
        max_date: new Date(2019, 6, 19),
        number_of_years: 10,
        unit: "month"
    },
        month,
        newdt,
        callback = (dt)=>newdt = dt;

    test("month control", assert=>{
        month = new Month(opts, callback);
        month.move(opts.initial_date);
        assert.equal("July", month.month.txt.textContent, "start at July");
        //must be placed so event bubbles
        document.querySelector("#qunit-fixture").appendChild(month.element);
        month.month.txt.click();
        assert.ok(month.month.element.classList.contains("expanded"), "expanded");
        document.querySelector("#qunit-fixture").click();
        assert.notOk(month.month.element.classList.contains("expanded"), "not expanded");

        month.months.chooser.children[1].click();
        assert.equal(1, newdt.getMonth(), "now at February");
    });
})
