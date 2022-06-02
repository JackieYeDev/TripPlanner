

let tripID;
let tripObj;
let day;

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
    tripNameInput.required = 'true';
    tripNameLabel.setAttribute('for', 'tripName');
    tripNameLabel.innerText = 'Trip Name: ';

    generateTableRows(tbody, tripNameLabel, tripNameInput);

    const startDate = document.createElement('input');
    const startDateLabel = document.createElement('label');

    startDate.id = 'startDate';
    startDate.type = 'date';
    startDateLabel.setAttribute('for', 'startDate');
    startDateLabel.innerText = 'Start Date:';

    generateTableRows(tbody, startDateLabel, startDate);

    const endDate = document.createElement('input');
    const endDateLabel = document.createElement('label');

    endDate.id = 'endDate';
    endDate.type = 'date';
    endDateLabel.setAttribute('for', 'endDate');
    endDateLabel.innerText = 'End Date:';

    generateTableRows(tbody, endDateLabel, endDate);

    const nextButton = document.createElement('button');

    // nextButton.id = 'next';
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
        if(startDate.value === "" || endDate.value === "") {
            messageBar.className = 'alert alert-danger';
            messageBar.setAttribute('role','alert');
            messageBar.innerText = 'Please enter a valid start and end date!';
            return false;
        }

        messageBar.innerHTML = '';
        messageBar.removeAttribute('class');
        messageBar.removeAttribute('role');

        const duration = [startDate, endDate];
        const numberOfDays = countNumberOfDays(startDate, endDate);

        day = 1;

        createNav(checkErrors(startDate, endDate), tocContainer);
        createForm(numberOfDays, nextButton, table);

        // nextButton.removeEventListener('click', beginAdventure);
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

/*
*  RENDER FORM AFTER BUTTON CLICKED
*/

const createNav = function (days, container) {
    if (days === false) return false;
    const messageBar = document.querySelector('#message-bar');
    messageBar.innerHTML = "";
    for(let i=0; i <= days; i++) {
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        h2.innerText = `Day ${i+1}`;
        li.appendChild(h2);
        container.appendChild(li);
    }
};

const createForm = function (days, button, ...elements) {
    // Remove unnecessary elements
    [...elements].forEach((e) => e.remove());

    // Add Hotel Form
    createHotelForm();

    // Add Activity Form
    createActivityForm();

    // Modify Next Button
    button.innerText = "Next Day";

    const daysArray = [];

    for(let i=0; i <= days; i++) {
        const day = new Day(i+1, []);
        daysArray.push(day);
    }

//    tripObj.setDays(daysArray);

};


const createHotelForm = function () {
    const divForm = document.createElement('div');
    const hotelForm = document.createElement('form');
    const hotelInput = document.createElement('input');
    const hotelAddButton = document.createElement('button');

    hotelInput.placeholder = 'Enter your hotel name here';
    hotelAddButton.className = 'btn btn-outline-primary mb-3';
    hotelAddButton.innerText = 'Search';
    divForm.className = 'mb-3';
    hotelForm.className = 'row g-3';

    [hotelInput, hotelAddButton].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        hotelForm.appendChild(div);
    });

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

    activityInput.placeholder = 'Type your activity in here.';
    activityAddButton.className = 'btn btn-outline-primary mb-3';
    activityAddButton.innerText = 'Add Activity';
    divForm.className = 'mb-3';
    activityForm.className = 'row g-3';
    startInput.placeholder = 'Start time [HHMM]';
    startInput.type = 'number';
    startInput.min = '0000'
    startInput.max = '2400';
    startInput.step = '10';
    endInput.placeholder = 'End time [HHMM]';
    endInput.type = 'number';
    endInput.min = '0000';
    endInput.max = '2400';
    endInput.step = '10';

    [startInput, endInput].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        activityForm.appendChild(div);
    });

    [activityInput, activityAddButton].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        activityForm.appendChild(div);
    });

    activityForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const detailsContainer = document.querySelector('div#details-container');
        const h5 = document.createElement('h5');
        const p = document.createElement('p');

        h5.innerHTML = `<u>${startInput.value} - ${endInput.value}</u>`;
        p.innerText = `${activityInput.value}`;

        detailsContainer.append(h5, p);

        const newActivity = new Activity(startInput.value, endInput.value, activityInput.value, tripID);

        tripObj.days[day-1].activity.push(newActivity);

        activityForm.reset();
    });

    divForm.appendChild(activityForm);

    document.querySelector('div#content-container').appendChild(divForm);
}

const countNumberOfDays = (startDate, endDate) =>
    ((Date.parse(endDate.valueAsDate) - Date.parse(startDate.valueAsDate))/(1000 * 3600 * 24));

const checkErrors = function (start, end) {
    const days = countNumberOfDays(start, end)
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

    createModal(jsonData.results.slice(0, 6));
    //
    // let jsonData = await fetch(proxyServerURL+query, configuration)
    //     .then(response => response.json())
    //     .then(data => data)
    //     .catch(err => console.error(err));
    //
    // console.log(jsonData.results);
    // createModal(jsonData.results);
}

const createModal = function (data, ...params) {
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
        divModal.style.display = 'none'
        divModal.innerHTML = ''
    })
    divDialog.className = 'modal-dialog modal-xl';
    divContent.className = 'modal-content';
    divHeader.className = 'modal-header';
    modalTitle.className = 'modal-title';
    modalTitle.innerText = 'Hotel Search Results';
    divBody.className = 'modal-body';
    cardGroup.className = 'row row-cols-1 row-cols-md-3 g-4';
    data.forEach((d) => createCard(cardGroup, divModal, d));
    divBody.append(cardGroup);
    divBody.style.overflow = 'scroll';
    divHeader.append(modalTitle, buttonModalClose);
    divContent.append(divHeader, divBody);
    divDialog.appendChild(divContent);
    divModal.appendChild(divDialog);
    divModal.classList.add("show");
    divModal.style.display = 'block';
}

const createCard = function (cardGroup, modal, data) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const title = document.createElement('h5');
    const text = document.createElement('p');
    const cardBody = document.createElement('div');
    const addButton = document.createElement('button');
    const div = document.createElement('div');
    card.className = 'card h-100';
    card.id = data.fsq_id;
    card.style = "width: 18rem";
    title.className = 'card-title';
    title.innerText = data.name;
    text.className = 'card-text';
    text.innerText = "Address: " + data.location.address;
    cardHeader.innerText = data.name;
    cardHeader.className = 'card-header';

    addButton.className = 'btn btn-outline-primary mb-3'
    addButton.innerText = 'Add Hotel';
    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'none';
        modal.innerHTML = '';
        addHotel(data.name);
    });

    cardBody.className = 'card-body';
    cardBody.append(title, text, addButton);
    card.append(cardHeader, cardBody);

    div.className = 'col';
    div.append(card);
    cardGroup.append(div);
}

const addHotel = function (hotelName) {
    const detailsContainer = document.querySelector('div#details-container');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');

    h5.innerHTML = '<u>Hotel Information</u>';
    p.innerText = hotelName;
    detailsContainer.append(h5, p);
}
