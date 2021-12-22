/**
 * test month controls
 */

import Control from "../../src/control.js";
const {test} = QUnit;

QUnit.module("main calendar control", ()=>{
    let opts = {
        initial_date: new Date(2018, 6, 12),
        min_date: null,
        max_date: null,
        number_of_years: 10,
        unit: "month"
    },
        control;

    test("main control", assert=>{
        control = new Control(opts);
        assert.ok( control.element, "element created");
        control.move(new Date(opts.initial_date));
        assert.equal(control.control.month.txt.textContent, "July", "move to July");
    });
})
