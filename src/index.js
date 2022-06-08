// Constructor for tripObj
const tripObj = {
    tripName: "",
    days: [],
    hotels: []
}

let day;
let duration;
let durationInDate;

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

    // Create Fillable Inputs
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
        // e.preventDefault();
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


        titleP.innerHTML += `<p><h3>${tripNameInput.value}</h3></p>`

        messageBar.innerHTML = '';
        messageBar.removeAttribute('class');
        messageBar.removeAttribute('role');

        durationInDate = [startDate.value, endDate.value];
        const numberOfDays = countNumberOfDays(startDate, endDate);
        duration = numberOfDays+1;

        // Start day to input
        day = 1;

        // Assign the tripObj a trip name.
        tripObj.tripName = tripNameInput.value;

        createNav(checkErrors(startDate, endDate), durationInDate, tocContainer);
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
    for(let i=0; i <= days; i++) {
        const li = document.createElement('li');
        li.innerText = `${incrementDay(duration[0], i)} (Day ${i+1})`;
        li.id = i+1;
        li.name = `${incrementDay(duration[0], i)}`;
        li.className = "list-group-item list-group-item-action";
        if(li.id == 1) {
            li.className = "list-group-item list-group-item-action active";
        }
        li.addEventListener('click', function (e){
            e.preventDefault();
            if(li.classList.contains('active')) {
                loadDate(li.id);
            } else {
                return false;
            }
        })
        container.appendChild(li);
    }
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

    nextButton.className = 'btn btn-dark btn-lg';
    nextButton.innerText = duration===1?'Summary of trip!':'Next Day';
    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (day < duration) {
            day += 1;
            const activityList = document.querySelector('#details-container');
            document.getElementById(`${day}`).className += ' active';
            activityList.innerHTML = '';
            console.log(tripObj);
            if (day === duration) {
                nextButton.innerText = 'Summary of trip!';
            }
        } else {
            summaryDialog()
        };
    });

    document.getElementById('content-container').append(nextButton);

    const daysArray = [];

    for(let i=0; i <= days; i++) {
        const day = {
            day: i+1,
            date: incrementDay(durationInDate[0], i),
            activity:[]
        };
        daysArray.push(day);
    }

    tripObj.days.push(daysArray);

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
    startInput.min = '00:00'
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
        const divContainer = document.createElement('div');
        const h5 = document.createElement('h5');
        const p = document.createElement('p');
        const deleteButton = document.createElement('button');

        h5.innerHTML = `<u>${startInput.value} - ${endInput.value}</u>`;
        p.innerText = `${activityInput.value}`;

        /*
        *  @TODO: Create an edit button with function to edit it's corresponding entry in tripObj
        */
        deleteButton.type = 'button';
        deleteButton.className = 'btn-close btn-close-white btn-sm';
        deleteButton.addEventListener('click', function (e) {
            e.preventDefault();
            const index = tripObj.days[0][day-1].activity.indexOf(activity);
            // div > h5 > button
            this.parentElement.parentElement.remove();
            tripObj.days[0][day-1].activity.removeIndex(index);
        });
        h5.append(deleteButton);
        divContainer.append(h5, p);

        detailsContainer.append(divContainer);

        const activity = {
            description: activityInput.value,
            startTime: startInput.value,
            endTime: endInput.value
        };

        tripObj.days[0][day-1].activity.push(activity);
        tripObj.days[0][day-1].activity.sort(function (a,b) {
            a = a.startTime.split(":").reduce((c,d) => c + d);
            b = b.startTime.split(":").reduce((c, d) => c + d);
            return a - b;
        });
        activityForm.reset();
    });

    divForm.appendChild(activityForm);

    document.querySelector('div#content-container').appendChild(divForm);
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

const checkErrors = function (start, end) {
    const days = countNumberOfDays(start, end);
    if (days < 0) {
        const messageBar = document.querySelector('#message-bar');
        messageBar.innerHTML = '<span> Please enter a valid start and end date! </span>';
    } else {
        return days;
    }
}

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
    const divModal = document.querySelector('#resultsModal');
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
    let address = data.location.formatted_address.split(",");
    address = `<strong>${data.name}</strong><br>${address[0]}<br>${address[1]}, ${address[2]}`;
    hotelAddress.innerHTML = address;
    text.append(hotelAddress);
    cardHeader.innerText = data.name;
    cardHeader.className = 'card-header';

    addButton.className = 'btn btn-outline-primary mb-3'
    addButton.innerText = 'Add Hotel';
    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'none';
        modal.innerHTML = '';
        const hotel = {
            name: data.name,
            address: address,
            checkInDate: dates[0],
            checkOutDate: dates[1]
        }

        addHotel(address);

        const startIndex = tripObj.days[0].findIndex((e) => e.date === dates[0]);
        const endIndex = tripObj.days[0].findIndex((e) => e.date === dates[1]);
        const checkInActivity = {
            description: `Check into hotel (${data.name})`,
            startTime: `15:00`,
            endTime: `16:00`
        };
        const checkOutActivity = {
            description: `Check out hotel (${data.name})`,
            startTime: `11:00`,
            endTime: `12:00`
        };
        tripObj.days[0][startIndex].activity.push(checkInActivity);
        tripObj.days[0][endIndex].activity.push(checkOutActivity);
        tripObj.hotels.push(hotel);
    });

    cardBody.className = 'card-body';
    cardBody.append(title, text, addButton);
    card.append(cardHeader, cardBody);

    div.className = 'col';
    div.append(card);
    cardGroup.append(div);
}

const addHotel = function (address) {
    const detailsContainer = document.querySelector('div#details-container');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');

    h5.innerHTML = '<u>Hotel Information</u>';
    p.innerHTML = address;
    detailsContainer.append(h5, p);
};

const loadDate = function (date) {
    const detailsContainer = document.querySelector('div#details-container');
    detailsContainer.innerHTML = "";
    tripObj.days[0][date-1].activity.forEach(function (e, index) {
        const activityDiv = document.createElement('div');
        const h5 = document.createElement('h5');
        const p = document.createElement('p');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        activityDiv.id = `${index}`;
        h5.innerHTML = `<u>${e.startTime} - ${e.endTime}</u>`;
        p.innerText = `${e.description}`;
        deleteButton.type = 'button';
        deleteButton.className = 'btn-close btn-close-white btn-sm';
        h5.append(deleteButton);
        deleteButton.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentElement.parentElement.remove();
            tripObj.days[0][date-1].activity.removeIndex(index);
        });

        activityDiv.append(h5, p);

        /*
        *  @TODO: Create an edit button with function to edit it's corresponding entry in tripObj
        */
        detailsContainer.append(activityDiv);
    });



    /*
     *  @TODO: Create an edit button with function to edit it's corresponding entry in tripObj
     */
};


const summaryDialog = function () {
    const divModal = document.createElement('div');
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
    modalTitle.innerText = `${tripObj.tripName.toUpperCase()}`;
    divBody.className = 'modal-body';
    divBody.style.overflow = 'scroll';

    const hotel = tripObj.hotels[0] === undefined? "None" : `${tripObj.hotels[0].address}`;

    divBody.innerHTML = `<h2>Hotel</h2><ul class="list-group"><li class="list-group-item">${hotel}</li></ul>`;

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

    document.body.append(divModal);
};

/*
*  @TODO: Create a load summary function
*/
const loadSummary = function () {
    // Create modal
};

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
