/**
 * test indicator controls
 */

import Indicator from "../../../src/control/indicator.js";
const {test} = QUnit;

QUnit.module("test indicator", ()=>{
    let dt = new Date(2018, 6, 12), ind;
    test("create", assert=>{
        ind = new Indicator("year");
        assert.ok(ind.element, "element exists");
        ind.move(dt);
        assert.equal(ind.txt.textContent, "2018", "year text");
    });
    
    test("month", assert=>{
        ind = new Indicator("month");
        assert.ok(ind.element, "element exists");
        ind.move(dt);
        assert.equal(ind.txt.textContent, "July", "month text");
    });

    test("week", assert=>{
        ind = new Indicator("week");
        assert.ok(ind.element, "element exists");
        ind.move(dt);
        assert.equal(ind.txt.textContent, "Jul 2018", "month year text");
        ind.move(new Date(2018, 6, 29));
        assert.equal(ind.txt.textContent, "Jul - Aug 2018", "month month year text");
        ind.move(new Date(2018, 11, 30));
        assert.equal(ind.txt.textContent, "Dec 2018 - Jan 2019", "month year month year text");
    });
})
