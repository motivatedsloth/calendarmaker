/**
 * test chooser controls
 */

import Chooser from "../../../../src/control/chooser/chooser.js";
const {test} = QUnit;

QUnit.module("test chooser", ()=>{
    let chs, 
        tgt = [2015, 2016, 2017, 2018, 2019],
        index, value,
        callback = (val, idx)=>{
            index = idx;
            value = val;
        };

    test("create and click", assert=>{
        chs = new Chooser(tgt, callback);
        assert.ok(chs.element, "element exists");
        chs.chooser.children[2].click();
        assert.equal(index, 2, "correct index");
        assert.equal(value, "2017", "correct value");
    });
})
