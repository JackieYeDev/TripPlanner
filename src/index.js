document.addEventListener("DOMContentLoaded", init);

function init() {
    /*
     *  INIT OF LANDING PAGE
     */

    // Declare Containers
    const formContainer = document.querySelector('div#content-container');
    const tocContainer = document.querySelector('ul#toc-container');
    const messageBar = document.querySelector('#message-bar');

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
    const startP = document.createElement('p');
    const startDate = document.createElement('input');
    const labelStartDate = document.createElement('label');
    const endP = document.createElement('p');
    const endDate = document.createElement('input');
    const labelEndDate = document.createElement('label');

    startDate.id = 'startDate';
    startDate.type = 'date';
    startDate.innerHTML.concat(" required");
    labelStartDate.setAttribute('for', 'startDate');
    labelStartDate.innerText = 'Start Date:';
    startP.append(labelStartDate, startDate);

    endDate.id = 'endDate';
    endDate.type = 'date';
    endDate.innerHTML.concat(" required");
    labelEndDate.setAttribute('for', 'endDate');
    labelEndDate.innerText = 'End Date:';
    endP.append(labelEndDate, endDate);

    // Append Form Items
    form.append(startP, endP);
    formContainer.appendChild(form);

    // Set Attributes to Next Button
    const nextButton = document.querySelector('button#next');
    nextButton.textContent = "Begin Your Adventure!";
    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        // Prevent Empty Input
        if(startDate.value === "" || endDate.value === "") {
            messageBar.innerHTML = '<span> Please enter a valid start and end date! </span>';
            return false;
        }
        const duration = [startDate, endDate];

        createNav(checkErrors(startDate, endDate), tocContainer);
        createForm(startP, endP);
    });
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
const createForm = function (...elements) {
    // Remove unnecessary elements
    [...elements].forEach((e) => e.remove());

    // Add Flight Form
    createFlightForm();

    // Add Hotel Form
    createHotelForm();

    // Add Activity Form
    createActivityForm();

};

const createFlightForm = function () {
    const divForm = document.createElement('div');
    const flightForm = document.createElement('form');
    const flightInput = document.createElement('input');
    const flightAddButton = document.createElement('button');

    flightInput.placeholder = 'Enter your flight number here';
    flightAddButton.className = 'btn btn-outline-primary mb-3';
    flightAddButton.innerText = 'Add Flight';
    flightAddButton.addEventListener('click',function (e) {
        e.preventDefault();
        console.log('Flight was clicked.');
    });
    divForm.className = 'mb-3';
    flightForm.className = 'row g-3';

    [flightInput, flightAddButton].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        flightForm.appendChild(div);
    });


    divForm.appendChild(flightForm);

    document.querySelector('div#content-container').appendChild(divForm);
};

const createHotelForm = function () {
    const divForm = document.createElement('div');
    const hotelForm = document.createElement('form');
    const hotelInput = document.createElement('input');
    const hotelAddButton = document.createElement('button');

    hotelInput.placeholder = 'Enter your hotel name here';
    hotelAddButton.className = 'btn btn-outline-primary mb-3';
    hotelAddButton.innerText = 'Add Hotel';
    hotelAddButton.addEventListener('click',function (e) {
        e.preventDefault();
        console.log('Hotel was clicked.');
    });
    divForm.className = 'mb-3';
    hotelForm.className = 'row g-3';

    [hotelInput, hotelAddButton].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        hotelForm.appendChild(div);
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
    activityAddButton.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Activity was clicked.');
    });
    divForm.className = 'mb-3';
    activityForm.className = 'row g-3';
    startInput.placeholder = 'Start time of activity';
    endInput.placeholder = 'End time of activity';

    [activityInput, activityAddButton].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        activityForm.appendChild(div);
    });

    [startInput, endInput].map(function (e) {
        const div = document.createElement('div');
        div.className = 'col-auto';
        div.appendChild(e);
        activityForm.appendChild(div);
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