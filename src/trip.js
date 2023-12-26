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

    set activity(value) {
        this.trip.activity = value;
    }


}

export default Trip;