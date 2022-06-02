class Trip {
    constructor(name, days = []) {
        this.id = Math.floor(Math.random() * 1000000);
        this.name = name || "";
        this.days = days || [];
    }

    getId() {
        return this.id
    }

    getName() {
        console.log(this.name);
    }
    setName(name) {
        this.name = name;
    }

    getDays() {
        console.log(this.days.length);
    }
    setDays([...Day]) {
        Day.forEach(e => this.days.push(e));
    }
}

class Day {
    constructor(day, activity = []) {
        this.day = parseInt(day);
        this.activity = activity;
        this.ref = tripID || null;
    }

    getDay() {
        console.log(this.activity);
    }

    setActivity(Activity) {
        this.activity.push(Activity);
    }
}

class Activity {
    constructor(start, end, description, tripID) {
        this.activityID = Math.floor(Math.random() * 1000000);
        this.start = start;
        this.end = end;
        this.description = description;
        this.ref = tripID || null;
    }

    getActivity() {
        return {
            "id": this.activityID,
            "start": this.start,
            "end": this.end,
            "description": this.description,
            "ref": this.ref
        }
    }

    setDay(Day) {
        Day.setActivity(this.getActivity());
    }

    setRef(id) {
        this.ref = id;
    }
}

class Hotel extends Activity {
    constructor() {
        super();

    }
}
