function init() {
    /*
     *  INIT OF LANDING PAGE
     */

    // Declare Containers
    const formContainer = document.querySelector('div#content-container');
    const tocContainer = document.querySelector('ul#toc-container');

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
    labelStartDate.innerText = 'Start Date: ';
    startP.append(labelStartDate, startDate);

    endDate.id = 'endDate';
    endDate.type = 'date';
    endDate.innerHTML.concat(" required");
    labelEndDate.setAttribute('for', 'endDate');
    labelEndDate.innerText = 'End Date: ';
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
            return false;
        }
        const duration = [startDate, endDate];
        // duration.forEach(function (date) {
        //     const li = document.createElement('li');
        //     const h4 = document.createElement('h4');
        //     console.log(date)
        //     h4.innerText = date.value;
        //     li.appendChild(h4);
        //     tocContainer.appendChild(li);
        // });
        fadeOutEffect(form);
        createNav(checkErrors(startDate, endDate), tocContainer);
    });
}

document.addEventListener("DOMContentLoaded", init);

/*
*  RENDER FORM AFTER BUTTON CLICKED
*/

const createNav = function (days, container) {
    if (days === false) return false;
    const messageBar = document.querySelector('#message-bar');
    messageBar.innerHTML = ""
    const numberOfDays = days;
    for(let i=0; i <= numberOfDays; i++) {
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        h2.innerText = `Day ${i+1}`;
        li.appendChild(h2);
        container.appendChild(li);
    }
};

const createFormForDay = function () {
    const table = document.createElement('table');
    const form = document.querySelector('div#content-container form')
    createFlightDetails(table);
    createHotelDetails(table);

    form.append(table);
};

const createFlightDetails = function (table) {
    const headerRow = document.createElement('tr');
    const tableRow = document.createElement('tr');
    const tdSearchBar = document.createElement('td');
    const tdAddButton = document.createElement('td');

    headerRow.innerHTML = '<th colspan="2"><u>Add Flight</u></th>';
    tdSearchBar.innerHTML = '<input type="text">';
    tdAddButton.innerHTML = '<input type="button" value="Add Flight">';

    tableRow.append(tdSearchBar, tdAddButton);

    return table.append(headerRow, tableRow);
}


const createHotelDetails = function (table) {
    const headerRow = document.createElement('tr');
    const tableRow = document.createElement('tr');
    const tdSearchBar = document.createElement('td');
    const tdAddButton = document.createElement('td');

    headerRow.innerHTML = '<th colspan="2"><u>Add Hotel</u></th>';
    tdSearchBar.innerHTML = '<input type="text">';
    tdAddButton.innerHTML = '<input type="button" value="Add Hotel">';

    tableRow.append(tdSearchBar, tdAddButton);

    return table.append(headerRow, tableRow);
}

/**
 * Fades Out and Deletes HTML Elements
 *
 * Reference for Fade Out Effect:
 * {@link https://www.geeksforgeeks.org/how-to-add-fade-out-effect-using-pure-javascript/}
 */
const fadeOutEffect = function (...elements) {
    //let form = elements
    const form = document.querySelector('input');
    let intervalID = setInterval(function () {
        if(!form.style.opacity) {
            form.style.opacity = 1;
        }
        if(form.style.opacity > 0) {
            form.style.opacity -= 0.1;
        }
        else {
            clearInterval(intervalID);
            form.innerHTML = '';
            createFormForDay();
        }
    }, 200);
}

/*
https://css-tricks.com/fly-in-newly-added-content-to-a-page/
 */
const flyInEffect = function () {

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