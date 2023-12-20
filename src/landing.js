class Landing {
    constructor(container) {
        this.container = container;
    }

    render() {
        // Create HTML Element(s)
        const contentContainer = document.createElement('div');
        const containerRowLayout = document.createElement('div');
        const containerColLayout = document.createElement('div');
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h1');
        const tripForm = document.createElement('form');
        const tripNameContainer = document.createElement('div');
        const tripNameLabel = document.createElement('label');
        const tripNameInput = document.createElement('input');
        const startDateContainer = document.createElement('div');
        const startDateLabel = document.createElement('label');
        const startDateInput = document.createElement('input');
        const endDateContainer = document.createElement('div');
        const endDateLabel = document.createElement('label');
        const endDateInput = document.createElement('input');
        const buttonContainer = document.createElement('div');
        const submitButton = document.createElement('button');

        // Assign class name(s) to HTML Element(s)
        contentContainer.className = 'container';
        containerRowLayout.className = 'row d-flex justify-content-center';
        containerColLayout.className = 'col-md-8 col-lg-6 col-xl-5 col-xxl-4';
        card.className = 'card mb-5" style="opacity: 1;';
        cardBody.className = 'card-body p-sm-5" style="opacity: 1;';
        cardTitle.className = 'text-center card-title mb-4';
        tripNameContainer.className = 'mb-3';
        tripNameLabel.className = 'form-label';
        tripNameInput.className = 'form-control';
        startDateContainer.className = 'mb-3';
        startDateLabel.className = 'form-label';
        startDateInput.className = 'form-control';
        endDateContainer.className = 'mb-3';
        endDateLabel.className = 'form-label';
        endDateInput.className = 'form-control';
        submitButton.className = 'btn btn-primary d-block w-100';

        // Assign id to Form Element(s)
        tripNameInput.id = 'tripNameInput';
        startDateInput.id = 'startDateInput';
        endDateInput.id = 'endDateInput';
        submitButton.id = 'submit'

        // Assign properties to HTML ELement(s)
        cardTitle.textContent = 'Trip Planner';
        tripNameLabel.textContent = 'Trip Name';
        tripNameInput.type = 'text';
        tripNameInput.placeholder = 'Trip Name';
        startDateLabel.textContent = 'Start Date';
        startDateInput.type = 'date';
        endDateLabel.textContent = 'End Date';
        endDateInput.type = 'date';
        submitButton.textContent = 'Submit';
        submitButton.type = 'button';

        // Add Events
        // submitButton.addEventListener('click', () => {
        //     if(this.formValidation() === true)
        //         return this.submit();
        // })
        tripForm.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') e.preventDefault();
        })

        // Append Elements to Respective Containers
        tripNameContainer.append(tripNameLabel, tripNameInput);
        startDateContainer.append(startDateLabel, startDateInput);
        endDateContainer.append(endDateLabel, endDateInput);
        buttonContainer.append(submitButton);
        tripForm.append(tripNameContainer, startDateContainer, endDateContainer, buttonContainer);
        cardBody.append(cardTitle, tripForm);
        card.append(cardBody);
        containerColLayout.append(card);
        containerRowLayout.append(containerColLayout);
        contentContainer.append(containerRowLayout);

        // Append to Document
        this.container.append(contentContainer);

        return true;
    }

    countNumberOfDays = (startDate, endDate) =>
        ((Date.parse(endDate.valueAsDate) - Date.parse(startDate.valueAsDate))/(1000 * 3600 * 24));

    formValidation() {
        const tripNameInput = document.querySelector('input#tripNameInput');
        const startDateInput = document.querySelector('input#startDateInput');
        const endDateInput = document.querySelector('input#endDateInput');

        if(tripNameInput.value === "") {
            tripNameInput.className += " is-invalid";
            return false;
        }

        if (startDateInput.value === "") {
            startDateInput.className += " is-invalid";
            return false;
        }

        if (endDateInput.value === "") {
            endDateInput.className += " is-invalid";
            return false;
        }

        if (this.countNumberOfDays(startDateInput, endDateInput) <= 0) {
            startDateInput.className += " is-invalid";
            endDateInput.className += " is-invalid";
            return false;
        }

        return true;
    }

    submit() {
        const tripNameInput = document.querySelector('input#tripNameInput').value;
        const startDateInput = document.querySelector('input#startDateInput');
        const endDateInput = document.querySelector('input#endDateInput');
        const tripData = {
            tripNameInput: tripNameInput,
            startDateInput: startDateInput.value,
            endDateInput: endDateInput.value,
            days: this.countNumberOfDays(startDateInput, endDateInput),
        }
        // For Debugging
        // console.log(json);
        return tripData;
    }

    destroy() {
        this.container.innerHTML = "";
    }
}

export default Landing;