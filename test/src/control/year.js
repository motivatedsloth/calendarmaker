/**
 * test year controls
 */

import Year from "../../../src/control/year.js";
const {test} = QUnit;

QUnit.module("test year", ()=>{
    let opts = {
        initial_date: new Date(2018, 6, 12),
        min_date: new Date(2013, 6, 5),
        max_date: new Date(2019, 6, 19),
        number_of_years: 10,
        unit: "year"
    },
        year,
        newdt,
        callback = (dt)=>newdt = dt;

    test("year control", assert=>{
        year = new Year(opts, callback);
        year.move(opts.initial_date);
        assert.equal("2018", year.year.txt.textContent, "start at 2018");
        //must be placed to bubble
        document.querySelector("#qunit-fixture").appendChild(year.element);
        year.year.txt.click();
        assert.ok(year.year.element.classList.contains("expanded"), "expanded");
        document.querySelector("#qunit-fixture").click();
        assert.notOk(year.year.element.classList.contains("expanded"), "not expanded");

        year.years.chooser.children[1].click();
        assert.equal("2014", newdt.getFullYear(), "now at 2014");
    });
})
