/**
 * test month chooser controls
 */

import Months from "../../../../src/control/chooser/months.js";
const {test} = QUnit;

QUnit.module("test months chooser", ()=>{
    let chs, 
        opts = {
            initial_date: new Date(2018, 6, 12),
            min_date: new Date(2018, 4, 12),
            max_date: new Date(2018, 8, 12),
            locale: "en-US"
        },
        index, value,
        callback = (val, idx)=>{
            index = idx;
            value = val;
        };

    test("create and click", assert=>{
        chs = new Months(callback, opts);
        assert.ok(chs.element, "element exists");
        //move to month
        chs.chooser.children[5].click();
        assert.equal(index, 5, "correct index");
        assert.equal(value, "June", "correct value");
        //try disabled month lower limit
        chs.chooser.children[2].click();
        assert.equal(index, 5, "index unchanged");
        assert.equal(value, "June", "value unchanged");
        //try disabled month upper limit
        chs.chooser.children[10].click();
        assert.equal(index, 5, "index still unchanged");
        assert.equal(value, "June", "value still unchanged");
        //move to month
        chs.chooser.children[7].click();
        assert.equal(index, 7, "correct index");
        assert.equal(value, "August", "correct value");
    });
})
