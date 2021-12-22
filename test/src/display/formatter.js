/**
 * test formatter
 */

import formatter from "../../../src/display/formatter.js";
const {test} = QUnit;

QUnit.module("Formatter", ()=>{
    let dt = new Date(2018, 5, 12),
        fmt = new formatter("en-US");

    test("check formats", assert=>{
        assert.equal("Tuesday", fmt.longday(dt), "longday");
        assert.equal("Tue", fmt.shortday(dt), "shortday");
        assert.equal("T", fmt.narrowday(dt), "narrowday");
        
        assert.equal("June", fmt.longmonth(dt), "longmonth");
        assert.equal("Jun", fmt.shortmonth(dt), "shortmonth");
        assert.equal("J", fmt.narrowmonth(dt), "narrowmonth");

        dt.type = "day";
        assert.equal("day-2018-5-12", fmt.key(dt), "key");
        assert.equal("12", fmt.date(dt), "date");
        assert.equal("2018", fmt.year(dt), "year");
    });
})
