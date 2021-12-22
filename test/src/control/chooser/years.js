/**
 * test year chooser controls
 */

import Years from "../../../../src/control/chooser/years.js";
const {test} = QUnit;

QUnit.module("test years chooser", ()=>{
    let chs, 
        opts = {
            initial_date: new Date(2018, 6, 12),
            min_date: null,
            max_date: null,
            number_of_years: 5
        },
        index, value,
        callback = (val, idx)=>{
            index = idx;
            value = val;
        };

    test("create and click", assert=>{
        chs = new Years(callback, opts);
        assert.ok(chs.element, "element exists");
        //move to year
        chs.chooser.children[0].click();
        assert.equal(index, 0, "correct index");
        assert.equal(value, "2016", "correct value");

        opts.min_date = new Date(2013, 6, 12);
        opts.max_date = new Date(2019, 6, 12);
        opts.number_of_years = 10;
        chs = new Years(callback, opts);
        assert.equal(7, chs.chooser.children.length, "correct number of children");
        //move to year
        chs.chooser.children[0].click();
        assert.equal(index, 0, "correct index");
        assert.equal(value, "2013", "correct value");
        //move to year
        chs.chooser.children[6].click();
        assert.equal(index, 6, "correct index");
        assert.equal(value, "2019", "correct value");
    });
})
