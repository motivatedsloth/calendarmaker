/**
 * test/src/util.js
 */
import * as util from "../../src/util.js";
const { test } = QUnit;

QUnit.module("util first last", ()=>{
    let dt = new Date(2018, 6, 12), //July 12, 2018
        curr, compare;
    test("first last days", assert=>{
        //check week where the first DOW is a sunday
        curr = util.firstDayOfWeek(dt);
        compare = new Date(2018, 6, 8);
        assert.equal(curr.getTime(), compare.getTime(), "sunday first");

        curr = util.lastDayOfWeek(dt);
        compare.setDate(14);
        assert.equal(curr.getTime(), compare.getTime(), "saturday last");

        //check with different first DOW
        curr = util.firstDayOfWeek(dt, 1);
        compare.setDate(9);
        assert.equal(curr.getTime(), compare.getTime(), "monday first");

        curr = util.lastDayOfWeek(dt, 1);
        compare.setDate(15);
        assert.equal(curr.getTime(), compare.getTime(), "sunday last");

        curr = util.firstDayOfMonth(dt);
        compare.setDate(1);
        assert.equal(curr.getTime(), compare.getTime(), "first of july");

        curr = util.lastDayOfMonth(dt);
        compare.setDate(31);
        assert.equal(curr.getTime(), compare.getTime(), "last of july");

        curr = util.firstDayOfYear(dt);
        compare.setMonth(0);
        compare.setDate(1);
        assert.equal(curr.getTime(), compare.getTime(), "Jan 1");

        curr = util.lastDayOfYear(dt);
        compare.setMonth(11);
        compare.setDate(31);
        assert.equal(curr.getTime(), compare.getTime(), "Dec 31");

    });

});

QUnit.module("container tests", ()=>{
    test("test container", assert=>{
        const year = util.container("year");
        assert.equal(year.tagName, "DIV", "Tag name is DIV");
        assert.equal(year.classList.contains("calendar-year"), true, "Element has 'calendar-year' class");
    });
});
