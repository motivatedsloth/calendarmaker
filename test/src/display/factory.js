/**
 * test factory
 */

import Factory from "../../../src/display/factory.js";
import Formatter from "../../../src/display/formatter.js";
const {test} = QUnit;

QUnit.module("Factory", ()=>{
    let dt = new Date(2018, 5, 12), 
        cmp,
        u, 
        fmt = new Formatter("en-US"),
        f = new Factory(0, fmt.key); //0 is first day of week

    test("factory methods", assert=>{
        u = f.day(dt);
        cmp = new Date(2018, 5, 12);
        assert.equal(u.getTime(), cmp.getTime(), "day same time");
        assert.equal(fmt.key(u), u.key, "key matches");
        assert.ok(u.container, "day container");
        
        u = f.week(dt);
        cmp.setDate(10);
        assert.equal(u.getTime(), cmp.getTime(), "week same time");
        assert.ok(u.container, "week container");
        assert.equal(7, u.units.length, "week correct number of days");

        u = f.month(dt);
        cmp.setDate(1);
        assert.equal(u.getTime(), cmp.getTime(), "month same time");
        assert.ok(u.container, "month container");
        assert.equal(35, u.units.length, "correct number of days");

        u = f.year(dt);
        cmp.setMonth(0);
        assert.equal(u.getTime(), cmp.getTime(), "year same time");
        assert.ok(u.container, "year container");
        assert.equal(12, u.units.length, "correct number of months");
    });
})
