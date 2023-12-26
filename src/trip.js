/*
DATA STRUCTURE
activity: {Day 1: [{}, {} ... {}], Day 2: [{}, {} ... {}] ... Day n: [{}, {} ... {}]};
Day n: [{startTime: "12:00 PM", endTime: "10:00PM", description: "Description of activity"}, ... {}];
 */
class Trip {
    constructor(data= {}) {
        this.trip = {
            tripName: data.tripName || "",
            startDate: data.startDate ||"",
            endDate: data.endDate || "",
            duration: data.duration || 0,
            hotel: {
                hotelName: data.hotelName || "",
                hotelAddress: data.hotelAddress || "",
            },
            activity: data.activity || {}
        }
    }

    // Getters and Setters
    get tripName() {
        return this.trip.tripName;
    }

    set tripName(value) {
        this.trip.tripName = value;
    }

    get startDate() {
        return this.trip.startDate;
    }

    set startDate(value) {
        this.trip.startDate = value;
    }

    get endDate() {
        return this.trip.endDate;
    }

    set endDate(value) {
        this.trip.endDate = value;
    }

    get duration() {
        return this.trip.duration;
    }

    set duration(value) {
        this.trip.duration = value;
    }

    get hotel() {
        return this.trip.hotel;
    }

    get hotelName() {
        return this.trip.hotel.hotelName;
    }

    set hotelName(value) {
        this.trip.hotel.hotelName = value;
    }

    get hotelAddress() {
        return this.trip.hotel.hotelAddress;
    }

    set hotelAddress(value) {
        this.trip.hotel.hotelAddress = value;
    }

    get activity() {
        return this.trip.activity;
    }

    addActivity(key, value) {
        this.trip.activity[key] = [...this.trip.activity[key], value];
        this.trip.activity[key].sort((a,b) => {
            return a.sortValue < b.sortValue ? -1 : 1;
        })
    }

}

export default Trip;