class Trip {
    constructor(name, days = [], hotels = []) {
        this.name = name || "";
        this.days = days || [];
        this.hotels = hotels || [];
    }
    createDaysHTML() {
        const daysArray = this.days.map(function (d) {
            const li = document.createElement('li');
            li.id = `${d.day}`;
            li.innerText = `${d.date} (Day ${d.day})`;
            li.className = 'list-group-item list-group-item-action';
            if(d.day == 1) {
                li.classList.add('active');
            }
            li.addEventListener('click', function () {
                if(li.classList.contains('active')) {
                    day = parseInt(li.id);
                    loadDate(li.id);
                } else {
                    return false;
                }
            })
            return li;
        });
        return daysArray;
    }
    createDays(startDate, endDate) {
        const numberOfDays = countNumberOfDays(startDate, endDate) + 1;
        for(let i = 0; i < numberOfDays; i++) {
            const day = new Day(i+1, incrementDay(startDate.value, i), []);
            this.setDays(day);
        }
    }
    setDays(day) {
        this.days.push(day);
    }
    getDaysListing() {
        const array = this.days.map(d => d.createActivityHTMLListingArray())
        return array;
    }
    queryDate(date) {
        const dateRef = this.days.filter(d => d.date == date);
        return dateRef;
    }
    queryDay(day) {
        const dayRef = this.days.filter(d => d.day == day);
        return dayRef;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setHotel(hotel) {
        this.hotels.push(hotel);
    }
    getHotel() {
        return this.hotels;
    }
}

class Day {
    constructor(day, date, activities = []) {
        this.day = day;
        this.date = date;
        this.activities = activities || [];
    }
    setActivity(Activity) {
        this.activities.push(Activity);
        this.sortActivities();
    }
    createActivityHTMLArray(ref) {
        const activityArray = this.activities.map((a) => a.createActivityHTML(ref));
        return activityArray;
    }
    createActivityHTMLListingArray(){
        const div = document.createElement('div');
        const strong = document.createElement('strong');
        strong.innerText = `Day ${this.day} - ${this.date}`;
        div.append(strong);
        if (this.activities.length != 0) {
            this.activities.map(function (a)  {
                const array = a.createActivityListingHTML();
                div.append(array);
            });
        } else {
            const p = document.createElement('p');
            p.innerText = "No Activities";
            div.append(p);
        }

        return div;
    }
    sortActivities() {
        this.activities.sort(function (a,b) {
            a = a.startTime.split(":").reduce((c, d) => c + d);
            b = b.startTime.split(":").reduce((c, d) => c + d);
            return a - b;
        })
    }
    deleteActivity(activity) {
        const newArray = this.activities.filter((a) => a != activity);
        this.activities = newArray;
    }
}

class Activity {
    constructor(startTime, endTime, description) {
        this.id = Math.ceil(Math.random() * 100000);
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }

    createActivityHTML = (ref) => {
        const dayRef = ref[0];
        const activityRef = dayRef.activities.filter(a => a == this);
        const div = document.createElement('div');
        const h5 = document.createElement('h5');
        const u = document.createElement('u');
        const p = document.createElement('p');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        div.id = this.id.toString();

        editButton.type = 'button';
        editButton.className = 'btn btn-success btn-sm rounded-0';
        editButton.innerHTML = `<i class="fa fa-edit"></i>`;
        editButton.addEventListener('click',() => {
            modifyModal(this.description, this.startTime, this.endTime, this.id);
        });

        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger btn-sm rounded-0';
        deleteButton.innerHTML = `<i class="fa fa-trash"></i>`;
        deleteButton.addEventListener('click', () => {
            const element = document.getElementById(this.id.toString());
            element.remove();
            dayRef.deleteActivity(this);
        });

        u.innerText = `${this.startTime} - ${this.endTime}`;
        h5.append(u, editButton, deleteButton);
        p.innerText = this.description;
        div.append(h5, p);
        return div;
    };
    createActivityListingHTML() {
        const div = document.createElement('div')
        const u = document.createElement('u');
        const p = document.createElement('p');
        u.innerText = `${this.startTime} - ${this.endTime}`;
        p.innerText = `${this.description}`;
        div.append(u, p);
        return div;
    }
    editActivity(startTime, endTime, description) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }
}

class Hotel {
    constructor(name, startDate, endDate, address) {
        this.name = name;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.init();
    }

    init() {
        const checkoutActivity = new Activity('11:00', '12:00', `Check out of Hotel (${this.name})`);
        const checkinActivity = new Activity('15:00', '16:00', `Check into Hotel (${this.name})`);
        let myRef = trip.queryDate(this.startDate);
        myRef[0].setActivity(checkinActivity);
        myRef = trip.queryDate(this.endDate);
        myRef[0].setActivity(checkoutActivity);
    }

    createHTMLAddress() {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.innerText = this.name;
        p.appendChild(strong);

        (function address1(address) {
            const span = document.createElement('span');
            const br = document.createElement('br');
            span.innerText = address[0];
            p.append(br,span);
        }) (this.address);

        (function addressCityAndState(address) {
            const span = document.createElement('span');
            const br = document.createElement('br');
            span.innerText = address[1] + "," + address[2];
            p.append(br,span);
        }) (this.address);

        return p;
    }
}

let day;
let duration;
let durationInDate;

const trip = new Trip();

document.addEventListener("DOMContentLoaded", init);

function init() {
    /*
     *  INIT OF LANDING PAGE
     */

    // Declare Containers
    const formContainer = document.querySelector('div#content-container');
    const tocContainer = document.querySelector('ul#toc-container');
    const messageBar = document.querySelector('div#message-bar');
    // const loadContainer = document.querySelector('div#load-container');

    // Create Title of Application
    const titleP = document.createElement('p');
    titleP.innerHTML = "<h1>Trip Planner</h1>";
    formContainer.append(titleP);

    // Create Landing Background
    document.body.style = "background-image: url('images/sunriseBackground.jpg');";

    // Create Initial Form to be Filled
    const form = document.createElement('form');
    form.id = "dates-form";

    // Create Fill-able Inputs
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    table.className = 'table table-borderless';

    const tripNameInput = document.createElement('input');
    const tripNameLabel = document.createElement('label');

    tripNameInput.type = 'text';
    tripNameInput.required = true;
    tripNameLabel.setAttribute('for', 'tripName');
    tripNameLabel.innerText = 'Trip Name: ';

    generateTableRows(tbody, tripNameLabel, tripNameInput);

    const startDate = document.createElement('input');
    const startDateLabel = document.createElement('label');

    startDate.id = 'startDate';
    startDate.type = 'date';
    startDate.required = true;
    startDateLabel.setAttribute('for', 'startDate');
    startDateLabel.innerText = 'Start Date:';

    generateTableRows(tbody, startDateLabel, startDate);

    const endDate = document.createElement('input');
    const endDateLabel = document.createElement('label');

    endDate.id = 'endDate';
    endDate.type = 'date';
    endDate.required = true;
    endDateLabel.setAttribute('for', 'endDate');
    endDateLabel.innerText = 'End Date:';

    generateTableRows(tbody, endDateLabel, endDate);

    const nextButton = document.createElement('button');

    nextButton.className = 'btn btn-outline-primary mb-3';
    nextButton.innerText = "Begin Your Adventure!";

    generateTableRows(tbody, nextButton);

    table.append(tbody);
    form.append(table);
    formContainer.appendChild(form);

    // Set Attributes to Next Button
    const beginAdventure = function (e) {
        e.preventDefault();
        // Prevent Empty Input

        if(tripNameInput.value === "") {
            messageBar.className = 'alert alert-danger';
            messageBar.setAttribute('role','alert');
            messageBar.innerText = 'Please enter a trip name!';
            return false;
        }

        if(startDate.value === "" || endDate.value === "") {
            messageBar.className = 'alert alert-danger';
            messageBar.setAttribute('role','alert');
            messageBar.innerText = 'Please enter a valid start and end date!';
            return false;
        }

        const isValidDates = validateDates(startDate, endDate)

        if(isValidDates === false) {
            messageBar.className = 'alert alert-danger';
            messageBar.setAttribute('role','alert');
            messageBar.innerText = 'Please enter a valid start and end date!';
            return false;
        }

        // Clears the message bar (if any messages were previously present)
        messageBar.innerHTML = '';
        messageBar.removeAttribute('class');
        messageBar.removeAttribute('role');

        durationInDate = [startDate.value, endDate.value];
        const numberOfDays = countNumberOfDays(startDate, endDate);
        duration = numberOfDays+1;

        // Start day to input
        day = 1;

        // Assign the trip a trip name.
        trip.setName(tripNameInput.value);
        trip.createDays(startDate, endDate);

        titleP.innerHTML += `<p><h3>${trip.getName()}</h3></p>`;
        let ref = trip.queryDate(startDate.value);
        
        createNav(duration, durationInDate, tocContainer);
        createForm(numberOfDays, table);
    }

    nextButton.addEventListener('click', beginAdventure);
}

const generateTableRows = function (tbody, ...elements) {
    const tr = document.createElement('tr');
    elements.map(function (e) {
        const td = document.createElement('td');
        td.appendChild(e);
        tr.appendChild(td);
    })
    tbody.appendChild(tr);
};

const generateTableHeaders = function (tbody, ...elements) {
    const tr = document.createElement('tr');
    elements.map(function (e) {
        const th = document.createElement('th');
        th.appendChild(e);
        tr.appendChild(th);
    })
    tbody.appendChild(tr);
};

const generateLabels = function (id, text) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = text;
    return label;
}

/*
*  RENDER FORM AFTER BUTTON CLICKED
*/

const createNav = function (days, duration, container) {
    if (days === false) return false;
    const messageBar = document.querySelector('#message-bar');
    messageBar.innerHTML = "";
    const daysArray = trip.createDaysHTML();
    daysArray.forEach(day => container.append(day))
};

const createForm = function (days, ...elements) {
    // Remove unnecessary elements
    [...elements].forEach((e) => e.remove());

    // Add Hotel Form
    createHotelForm();

    // Add Activity Form
    createActivityForm();

    // Modify Next Button
    const nextButton = document.createElement('button');

    nextButton.id = 'next-button';
    nextButton.className = 'btn btn-dark btn-lg';
    nextButton.innerText = duration===1?'Summary of trip!':'Next Day';
    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (day < duration) {
            day += 1;
            document.getElementById(`${day}`).className += ' active';
            loadDate(day);
            if (day === duration) nextButton.innerText = 'Summary of trip!'
            else nextButton.innerText = 'Next Day'
        } else {
            summaryDialog()
        }
    });

    document.getElementById('content-container').append(nextButton);
};


const createHotelForm = function () {
    const divForm = document.createElement('div');
    const hotelForm = document.createElement('form');
    const hotelInput = document.createElement('input');
    const hotelAddButton = document.createElement('button');
    const checkInDate = document.createElement('input');
    const checkOutDate = document.createElement('input');


    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    table.className = 'table table-borderless';

    checkInDate.id = 'checkInDate';
    checkInDate.type = 'date';
    checkInDate.value = durationInDate[0];
    checkInDate.min = decrementDay(durationInDate[0]);
    checkInDate.max = incrementDay(durationInDate[1]);
    checkOutDate.id = 'checkOutDate';
    checkOutDate.type = 'date';
    checkOutDate.value = durationInDate[1];
    checkOutDate.min = decrementDay(durationInDate[0]);
    checkOutDate.max = incrementDay(durationInDate[1]);
    hotelInput.placeholder = 'Location for hotel search';
    hotelInput.id = 'hotelInput';
    hotelAddButton.className = 'btn btn-outline-primary mb-3';
    hotelAddButton.innerText = 'Search';
    divForm.className = 'mb-3';
    hotelForm.className = 'row g-3';


    const hotelLabel = generateLabels(hotelInput.id, "Hotel Search by Location:");
    const checkInDateLabel = generateLabels("checkInDate", "Check In Date:");
    const checkOutDateLabel = generateLabels("checkOutDate", "Check Out Date:");
    generateTableHeaders(tbody, hotelLabel, checkInDateLabel, checkOutDateLabel);
    generateTableRows(tbody, hotelInput, checkInDate, checkOutDate);
    generateTableRows(tbody, hotelAddButton);
    table.append(tbody);
    hotelForm.append(table);

    hotelForm.addEventListener('submit', function (e) {
        e.preventDefault();
        queryHotels(hotelInput.value);
        hotelForm.reset();
    });

    divForm.appendChild(hotelForm);

    document.querySelector('div#content-container').appendChild(divForm);
};

const createActivityForm = function () {
    const divForm = document.createElement('div');
    const activityForm = document.createElement('form');
    const activityInput = document.createElement('input');
    const activityAddButton = document.createElement('button');
    const startInput = document.createElement('input');
    const endInput = document.createElement('input');

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    table.className = 'table table-borderless';

    activityInput.placeholder = 'Type your activity in here.';
    activityInput.required = true;
    activityInput.id = 'activityInput';
    activityAddButton.className = 'btn btn-outline-primary mb-3';
    activityAddButton.innerText = 'Add Activity';
    divForm.className = 'mb-3';
    activityForm.className = 'row g-3';
    startInput.type = 'time';
    startInput.min = '00:00';
    startInput.max = '24:00';
    startInput.required = true;
    startInput.id = 'startInput';
    endInput.type = 'time';
    endInput.min = '00:00';
    endInput.max = '24:00';
    endInput.required = true;
    endInput.id = 'endInput';

    const activityLabel = generateLabels(activityInput.id, "Activity");
    const startLabel = generateLabels(startInput.id, "Start Time");
    const endLabel = generateLabels(endInput.id, "End Time");
    generateTableHeaders(tbody, activityLabel, startLabel, endLabel);
    generateTableRows(tbody, activityInput, startInput, endInput);
    generateTableRows(tbody, activityAddButton);
    table.append(tbody);
    activityForm.append(table);

    activityForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const detailsContainer = document.querySelector('div#details-container');
        const activity = new Activity(startInput.value, endInput.value, activityInput.value);
        const ref = trip.queryDay(day);
        ref[0].setActivity(activity);
        detailsContainer.append(activity.createActivityHTML(ref));

        activityForm.reset();
    });

    divForm.appendChild(activityForm);

    document.querySelector('div#content-container').appendChild(divForm);
};



/*
*   Proxy Server for Trip Planner
*/
// const proxyServerURL = `https://proxyservertripplanner.onrender.com/hotels/`;
//
// const configuration = {
//     mode: "cors",
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*"
//     }
// }

const queryHotels = async function (query) {
    const jsonURL = document.location.href == "https://jackieyedev.github.io/TripPlanner/" ? "https://jackieyedev.github.io/TripPlanner/test/res.json" : "../test/res.json"
    let jsonData =  await fetch(jsonURL)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.error(err));

    createHotelModal(jsonData.results.slice(0, 6), durationInDate);
    //
    // let jsonData = await fetch(proxyServerURL+query, configuration)
    //     .then(response => response.json())
    //     .then(data => data)
    //     .catch(err => console.error(err));
    //
    // console.log(jsonData.results);
    // createModal(jsonData.results);
}

const createHotelModal = function (data, ...params) {
    const divModal = document.getElementById('content-modal');
    const buttonModalClose = document.createElement('button');
    const modalTitle = document.createElement('h5');
    const divDialog = document.createElement('div');
    const divContent = document.createElement('div');
    const divHeader = document.createElement('div');
    const divBody = document.createElement('div');
    const cardGroup = document.createElement('div');
    divModal.className = 'modal fade';
    divModal.setAttribute('tabIndex', '-1');
    divModal.setAttribute('role', 'dialog');
    divModal.ariaHidden = 'true';
    divModal.setAttribute('aria-labelledby', 'resultsModalLabel');
    buttonModalClose.className = 'btn-close';
    buttonModalClose.type = 'button';
    buttonModalClose.addEventListener('click', function (e) {
        e.preventDefault();
        divModal.style.display = 'none';
        divModal.innerHTML = '';
    })
    divDialog.className = 'modal-dialog modal-xl';
    divContent.className = 'modal-content';
    divHeader.className = 'modal-header';
    modalTitle.className = 'modal-title';
    modalTitle.innerText = 'Hotel Search Results';
    divBody.className = 'modal-body';
    divBody.style.overflow = 'scroll';
    cardGroup.className = 'row row-cols-1 row-cols-md-3 g-4';
    data.forEach((d) => createHotelCard(cardGroup, divModal, params[0], d));
    divBody.append(cardGroup);
    divHeader.append(modalTitle, buttonModalClose);
    divContent.append(divHeader, divBody);
    divDialog.appendChild(divContent);
    divModal.appendChild(divDialog);
    divModal.classList.add("show");
    divModal.style.display = 'block';
}

const createHotelCard = function (cardGroup, modal, dates, data) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const title = document.createElement('h5');
    const text = document.createElement('p');
    const hotelAddress = document.createElement('address');
    const cardBody = document.createElement('div');
    const addButton = document.createElement('button');
    const div = document.createElement('div');
    card.className = 'card h-100';
    card.id = data.fsq_id;
    card.style = "width: 18rem";
    title.className = 'card-title';
    title.innerText = data.name;
    text.className = 'card-text';
    const address = data.location.formatted_address.split(",");
    const splitAddress = `<strong>${data.name}</strong><br>${address[0]}<br>${address[1]}, ${address[2]}`;
    hotelAddress.innerHTML = splitAddress;
    text.append(hotelAddress);
    cardHeader.innerText = data.name;
    cardHeader.className = 'card-header';

    addButton.className = 'btn btn-outline-primary mb-3'
    addButton.innerText = 'Add Hotel';
    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        const dayRef = trip.queryDay(day);
        modal.style.display = 'none';
        modal.innerHTML = '';
        const hotel = new Hotel(data.name, dates[0], dates[1], address);
        trip.setHotel(hotel);
        loadDate(day);
    });

    cardBody.className = 'card-body';
    cardBody.append(title, text, addButton);
    card.append(cardHeader, cardBody);

    div.className = 'col';
    div.append(card);
    cardGroup.append(div);
}

const loadDate = function (date) {
    const detailsContainer = document.querySelector('div#details-container');
    detailsContainer.innerHTML = "";
    const hotels = trip.hotels;
    const dayRef = trip.queryDay(date);
    dayRef[0].createActivityHTMLArray(dayRef).forEach((a) => detailsContainer.append(a));
    const nextButton = document.getElementById('next-button');
    if (day < duration) nextButton.innerText = 'Next Day'
    else nextButton.innerText = 'Summary of trip!';
    trip.hotels.forEach((h) => detailsContainer.prepend(h.createHTMLAddress()));
    const h5 = document.createElement('h5');
    h5.innerHTML = '<u>Hotel Information</u>';
    detailsContainer.prepend(h5);
};


const summaryDialog = function () {
    const divModal = document.getElementById('content-modal');
    const divHeader = document.createElement('div');
    const divBody = document.createElement('div');
    const divDialog = document.createElement('div');
    const divContent = document.createElement('div');
    const buttonModalClose = document.createElement('button');
    const modalTitle = document.createElement('h5');

    divModal.className = 'modal fade';
    divModal.setAttribute('tabIndex', '-1');
    divModal.setAttribute('role', 'dialog');
    divModal.ariaHidden = 'true';
    divModal.setAttribute('aria-labelledby', 'summaryDialogLabel');

    divDialog.className = 'modal-dialog modal-lg';
    divContent.className = 'modal-content';
    divHeader.className = 'modal-header';
    modalTitle.className = 'modal-title';
    modalTitle.innerText = `${trip.getName().toUpperCase()}`;
    divBody.className = 'modal-body';
    divBody.style.overflow = 'scroll';

    const hotel = trip.getHotel();
    createListing(divBody,'Hotel', trip.hotels.map(hotel => hotel.createHTMLAddress()));

    const br = document.createElement('br');
    divBody.append(br);

    const activities = trip.getDaysListing();
    createListing(divBody, 'Activity', activities);

    buttonModalClose.className = 'btn-close';
    buttonModalClose.type = 'button';
    buttonModalClose.addEventListener('click', function (e) {
        e.preventDefault();
        divModal.style.display = 'none';
        divModal.innerHTML = '';
    });

    divHeader.append(modalTitle, buttonModalClose);
    divContent.append(divHeader, divBody);
    divDialog.appendChild(divContent);
    divModal.appendChild(divDialog);

    divModal.classList.add("show");
    divModal.style.display = 'block';
};

const createListing = function (container, heading, listItems ) {
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');

    h2.innerText = heading;
    ul.className = 'list-group';

    [...listItems].forEach(function (item) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.append(item);
        ul.append(li);
    });

    container.append(h2, ul);
};

 function modifyModal(description, startTime, endTime, id) {
    const divModal = document.getElementById('content-modal');
    const divHeader = document.createElement('div');
    const divBody = document.createElement('div');
    const divFooter = document.createElement('div');
    const divDialog = document.createElement('div');
    const divContent = document.createElement('div');
    const buttonCancel = document.createElement('button');
    const buttonSubmit = document.createElement('button');
    const modalTitle = document.createElement('h5');

    const form = document.createElement('form');
    const editDescription = document.createElement('input');
    const editDescriptionLabel = document.createElement('label');
    const editStartTime = document.createElement('input');
    const editStartTimeLabel = document.createElement('label');
    const editEndTime = document.createElement('input');
    const editEndTimeLabel = document.createElement('label');

    divModal.innerHTML = "";

    form.className = 'form-floating';

    divModal.className = 'modal fade';
    divModal.setAttribute('tabIndex', '-1');
    divModal.setAttribute('role', 'dialog');
    divModal.ariaHidden = 'true';
    divModal.setAttribute('aria-labelledby', 'summaryDialogLabel');

    divDialog.className = 'modal-dialog modal-md';
    divContent.className = 'modal-content';
    divHeader.className = 'modal-header';
    modalTitle.className = 'modal-title';
    modalTitle.innerText = 'Modify Activity';
    divBody.className = 'modal-body';
    divBody.style.overflow = 'scroll';

    editDescription.className = 'form-control';
    editDescription.value = `${description}`;
    editDescription.id = 'description';
    editDescription.type = 'text';
    editDescription.required = true;
    editDescriptionLabel.setAttribute('for', 'description');
    editDescriptionLabel.innerText = 'Description';
    editStartTime.className = 'form-control';
    editStartTime.value = `${startTime}`;
    editStartTime.type = 'time';
    editStartTime.id = 'start-time';
    editStartTime.min = '00:00';
    editStartTime.max = '24:00';
    editStartTime.required = true;
    editStartTimeLabel.setAttribute('for', 'start-time');
    editStartTimeLabel.innerText = 'Start Time';
    editEndTime.className = 'form-control';
    editEndTime.value = `${endTime}`;
    editEndTime.id = 'end-time';
    editEndTime.type = 'time';
    editEndTime.min = '00:00';
    editEndTime.max = '24:00';
    editEndTime.required = true;
    editEndTimeLabel.setAttribute('for', 'end-time');
    editEndTimeLabel.innerText = 'End Time';

    [[editDescription, editDescriptionLabel], [editStartTime, editStartTimeLabel], [editEndTime, editEndTimeLabel]]
        .map(function(e) {
            const div = document.createElement('div');
            div.className = 'form-floating';
            [...e].forEach((a) => div.append(a));
            divBody.append(div);
    })

    divFooter.className = 'modal-footer';
    buttonCancel.innerText = 'Cancel';
    buttonCancel.className = 'btn btn-danger';
    buttonCancel.type = 'button';
    buttonCancel.addEventListener('click', function (e) {
        e.preventDefault();
        divModal.style.display = 'none';
        divModal.innerHTML = '';
    });

    buttonSubmit.innerText = 'Submit Changes';
    buttonSubmit.type = 'submit';
    buttonSubmit.className = 'btn btn-success';

    divHeader.append(modalTitle);
    divFooter.append(buttonCancel, buttonSubmit);
    divContent.append(divHeader, divBody, divFooter);
    form.append(divContent);

    form.addEventListener('submit', function (e) {
        // Prevent Form Submission
        e.preventDefault();
        const dayRef = trip.queryDay(day);
        const activityRef = trip.days[day-1].activities.filter((a) => a.id == id)
        activityRef[0].editActivity(editStartTime.value, editEndTime.value, editDescription.value);

        const oldListing = document.getElementById(id);
        oldListing.remove();

        const divContainer = document.getElementById('details-container');
        divContainer.append(activityRef[0].createActivityHTML(dayRef));
        divModal.style.display = 'none';
        divModal.innerHTML = '';
    });

    divDialog.appendChild(form);
    divModal.appendChild(divDialog);

    divModal.classList.add("show");
    divModal.style.display = 'block';
};

const countNumberOfDays = (startDate, endDate) =>
    ((Date.parse(endDate.valueAsDate) - Date.parse(startDate.valueAsDate))/(1000 * 3600 * 24));

const incrementDay = function (dateString, i=1) {
    let date = new Date(dateString);
    date.setDate(date.getDate() + i);
    return date.toISOString().slice(0, 10);
}

const decrementDay = function (dateString, i=1) {
    let date = new Date(dateString);
    date.setDate(date.getDate() - i);
    return date.toISOString().slice(0, 10);
}

const validateDates = function (start, end) {
    const days = countNumberOfDays(start, end);
    if (days < 0) return false
}

Array.prototype.removeIndex = function (index) {
    const a = [];
    for (let i = 0; i < this.length; i++) {
        if(i !== index) {
            a.push(this[i]);
        }
    }
    while(this.length > 0) {
        this.pop();
    };
    a.map((ele) => this.push(ele));
    return this;
};