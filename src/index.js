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
        let duration = [startDate, endDate];
        duration.forEach(function (date) {
            const li = document.createElement('li');
            const h4 = document.createElement('h4');
            console.log(date)
            h4.innerText = date.value;
            li.appendChild(h4);
            tocContainer.appendChild(li);
        });
    });
}

document.addEventListener("DOMContentLoaded", init);