/**
 * date formatter 
 */
export default class{
    constructor(locale){
        this.formatters = {};
        this.locale = locale;
    }

    longday(dt){
        if(!this.formatters.longday){
            this.formatters.longday = new Intl.DateTimeFormat(this.locale, {weekday:"long"}).format;
        }
        return this.formatters.longday(dt);
    }

    shortday(dt){
        if(!this.formatters.shortday){
            this.formatters.shortday = new Intl.DateTimeFormat(this.locale, {weekday:"short"}).format;
        }
        return this.formatters.shortday(dt);
    }

    narrowday(dt){
        if(!this.formatters.narrowday){
            this.formatters.narrowday = new Intl.DateTimeFormat(this.locale, {weekday:"narrow"}).format;
        }
        return this.formatters.narrowday(dt);
    }

    longmonth(dt){
        if(!this.formatters.longmonth){
            this.formatters.longmonth = new Intl.DateTimeFormat(this.locale, {month:"long"}).format;
        }
        return this.formatters.longmonth(dt);
    }

    shortmonth(dt){
        if(!this.formatters.shortmonth){
            this.formatters.shortmonth = new Intl.DateTimeFormat(this.locale, {month:"short"}).format;
        }
        return this.formatters.shortmonth(dt);
    }

    narrowmonth(dt){
        if(!this.formatters.narrowmonth){
            this.formatters.narrowmonth = new Intl.DateTimeFormat(this.locale, {month:"narrow"}).format;
        }
        return this.formatters.narrowmonth(dt);
    }

    key(dt){
        return (dt.type?dt.type:"day") + "-" + dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
    }

    date(dt){
        return dt.getDate();
    }

    year(dt){
        return dt.getFullYear();
    }
}
