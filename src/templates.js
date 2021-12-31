export default {
    //templates for month display
    month: {
        day: '`<div class="calendar-date"><span class="calendar-date-number">${"date"}</span></div>${"content"}`',
        weekday: '`<div class="calendar-weekday"><span class="short">${"shortday"}</span><span class="long">${"longday"}</span></div>`',
        fillerday: '`<div class="calendar-date"><span class="calendar-date-number">${"date"}</span></div>${"content"}`',
        header: '`<div class="calendar-header">${"weekdays"}</div>`',
        display: '`${"header"}${"content"}`'
    },

    year: {
        day: '`<div class="calendar-date"><span class="calendar-date-number">${"date"}</span></div>`',
        fillerday: '`<div class="calendar-day calendar-day-filler"></div>`',
        weekday: '`<div class="calendar-weekday">${"narrowday"}</div>`',
        monthheader: '`<div class="calendar-month-name">${"longmonth"}</div><div class="calendar-header">${"weekdays"}</div>`',
        month: '`${"monthheader"}${"content"}`',
        display: '`${"content"}`'
    },

    week: {
        day: '`<div class="calendar-date"><span class="calendar-date-string short">${"narrowday"}</span><span class="calendar-date-string long">${"shortday"}</span> <span class="calendar-date-number">${"date"}</span></div>${"content"}`',
        display: '`${"content"}`'
    },

    agenda: {
        day: '`<div class="calendar-date"><span class="calendar-date-string">${"shortday"} ${"shortmonth"}</span> <span class="calendar-date-number">${"date"}</span></div>${"content"}`',
        display: '`${"content"}`'
    }
}
