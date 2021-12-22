/**
 * test week controls
 */

import Week from "../../../src/control/week.js";
const {test} = QUnit;

QUnit.module("test week", ()=>{
    let opts = {
        initial_date: new Date(2018, 6, 12),
        min_date: new Date(2013, 6, 5),
        max_date: new Date(2019, 6, 19),
        unit: "week"
    },
    week;

    test("week control", assert=>{
        week = new Week(opts);
        week.move(opts.initial_date);
        assert.equal("Jul 2018", week.week.txt.textContent, "start at July");
    });
})
