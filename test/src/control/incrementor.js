/**
 * test increment controls
 */

import Incrementor from "../../../src/control/incrementor.js";
const {test} = QUnit;

QUnit.module("test incrementor", (hooks)=>{
    let dt = new Date(2018, 6, 12),
        lowerLimit = new Date(2018, 6, 13),
        upperLimit = new Date(2018, 6, 11),
        inc,
        isCalled,
        callback = ()=>isCalled = true;
    hooks.beforeEach(()=>isCalled = false);

    inc = new Incrementor("prev", callback);
    test("constructor", assert=>assert.ok(inc.element, "element exists"));
    test("not clicked", assert=>assert.equal(isCalled, false, "element not clicked"));
    test("click", assert=>{
        inc.element.click();
        assert.equal(isCalled, true, "element clicked");
    });

    inc = new Incrementor("prev", callback, lowerLimit);
    test("click past limit", assert=>{
        inc.move(dt);
        inc.element.click();
        assert.equal(isCalled, false, "click no callback");
        assert.equal(inc.element.classList.contains("disabled"), true, "is disabled")
    });

    inc = new Incrementor("next", callback, upperLimit);
    test("click next limit", assert=>{
        inc.move(dt);
        inc.element.click();
        assert.equal(isCalled, false, "click no callback");
        assert.equal(inc.element.classList.contains("disabled"), true, "is disabled")
    });
})
