/**
 * tests src/control/base.js
 */

import Base from "../../../src/control/base.js"
const { test } = QUnit;

QUnit.module("test control base", (hooks)=>{
    let opts, base;

    hooks.beforeEach(()=>{
        opts = {
            initial_date: new Date(2018, 6, 12),
            min_date: null,
            max_date: null,
            unit: "month"
        }
    });

    test("constructor", assert=>{
        base = new Base(opts);
        base.move(opts.initial_date);
        assert.ok(base.element, "element exists");
        assert.ok(base.element.querySelectorAll(".calendar-control-next"), "next exists");
        assert.ok(base.element.querySelectorAll(".calendar-control-prev"), "prev exists");
    });

    test("invalid move", assert=>{
        opts.min_date = new Date(2018, 6, 5);
        opts.max_date = new Date(2018, 6, 19);
        opts.unit = "week";
        base = new Base(opts);
        base.move(opts.initial_date);
        assert.throws(()=>base.move(new Date(2018, 5, 30)), "moving past min week");
        assert.throws(()=>base.move(new Date(2018, 6, 22)), "move past max week");

        opts.unit = "month";
        base = new Base(opts);
        base.move(opts.initial_date);
        assert.throws(()=>base.move(new Date(2018, 5, 30)), "moving past min month");
        assert.throws(()=>base.move(new Date(2018, 7, 22)), "move past max month");

        opts.unit = "year";
        base = new Base(opts);
        base.move(opts.initial_date);
        assert.throws(()=>base.move(new Date(2017, 5, 30)), "moving past min year");
        assert.throws(()=>base.move(new Date(2019, 7, 22)), "move past max year");
    });

    test("increments", assert=>{
        let next = new Date(2018, 6, 15),
            prev = new Date(2018, 6, 1),
            newdt, 
            callback = (dt)=>newdt = dt;
        
        opts.unit = "week";
        base = new Base(opts, callback);
        base.move(opts.initial_date);
        base.increment(1);
        assert.equal(newdt.getTime(), next.getTime(), "next week matches");
        base.increment(-1);
        assert.equal(newdt.getTime(), prev.getTime(), "prev week matches");
        base.next.element.click();
        assert.equal(newdt.getTime(), next.getTime(), "next click");
        base.prev.element.click();
        assert.equal(newdt.getTime(), prev.getTime(), "prev click");


        next = new Date(2018, 7, 1);
        prev = new Date(2018, 5, 1);
        opts.unit = "month";
        base = new Base(opts, callback);
        base.move(opts.initial_date);
        base.increment(1);
        assert.equal(newdt.getTime(), next.getTime(), "next month matches");
        base.increment(-1);
        assert.equal(newdt.getTime(), prev.getTime(), "prev month matches");
        base.next.element.click();
        assert.equal(newdt.getTime(), next.getTime(), "next click");
        base.prev.element.click();
        assert.equal(newdt.getTime(), prev.getTime(), "prev click");

        next = new Date(2019, 0, 1);
        prev = new Date(2017, 0, 1);
        opts.unit = "year";
        base = new Base(opts, callback);
        base.move(opts.initial_date);
        base.increment(1);
        assert.equal(newdt.getTime(), next.getTime(), "next year matches");
        base.increment(-1);
        assert.equal(newdt.getTime(), prev.getTime(), "prev year matches");
        base.next.element.click();
        assert.equal(newdt.getTime(), next.getTime(), "next click");
        base.prev.element.click();
        assert.equal(newdt.getTime(), prev.getTime(), "prev click");
    });
});

