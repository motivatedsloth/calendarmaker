export default {
    "unit": "month", //one of year, month, week, agenda
    "initial_date": new Date(),
    "min_date": null, // Date object of first possible date to select
    "max_date": null, // Date object of last possible date to select
    "number_of_years": 10, // number of years to show in chooser
    "controls": true, //show controls or not true for year, month, week; always false for agenda
    "display_interval": 14, //days to show in agenda view
    "initialize": true, //true creates calendar in constructor
    "locale": "en-US", // for month and day names
    "first_dow": 0, //0 = sunday, 1 = monday
};
