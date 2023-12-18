class HotelForm {

    constructor(container) {
        this.container = container;
    }


    render() {
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h4');
        const form = document.createElement('form');
        const locationLabel = document.createElement('label');
        const locationInput = document.createElement('input');
        const startDateLabel = document.createElement('label');
        const startDateInput = document.createElement('input');
        const endDateLabel = document.createElement('label');
        const endDateInput = document.createElement('input');
        const searchButton = document.createElement('button');

        // Assign style(s) to HTML Element(s)
        cardBody.style = 'margin-bottom: 10;';
        startDateLabel.style = 'margin-top: 12px;';
        endDateLabel.style = 'padding-top: 0px;margin-top: 12px;';
        searchButton.style = 'margin-top: 12px;';

        // Assign class name(s) to HTML Element(s)
        card.className = 'card';
        cardBody.className = 'card-body';
        cardTitle.className = 'card-title';
        locationLabel.className = 'form-label';
        locationInput.className = 'form-control';
        startDateLabel.className = 'form-label';
        startDateInput.className = 'form-control';
        endDateLabel.className = 'form-label';
        endDateInput.className = 'form-control';
        searchButton.className = 'btn btn-primary d-block w-100';

        // Assign id to Form Element(s)
        locationInput.id = 'locationInput';
        startDateInput.id = 'startDateInput';
        endDateInput.id = 'endDateInput';

        // Assign properties to HTML ELement(s)
        cardTitle.innerText = 'Hotel Search by Location';
        locationLabel.innerText = 'Location:'
        locationInput.type = 'text';
        locationInput.placeholder = 'Please input a location';
        startDateLabel.innerText = 'Start Date:';
        startDateInput.type = 'date';
        endDateLabel.innerText = 'End Date:';
        endDateInput.type = 'date';
        searchButton.type = 'button';
        searchButton.textContent = 'Search';

        form.append(locationLabel, locationInput, startDateLabel, startDateInput, endDateLabel, endDateInput, searchButton);
        cardBody.append(cardTitle, form);
        card.append(cardBody);

        this.container.append(card);
    }
}

export default HotelForm;