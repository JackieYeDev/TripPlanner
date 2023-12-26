class ActivityForm {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
    }

    render() {
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h4');
        const activityForm = document.createElement('form');
        const activityLabel = document.createElement('label');
        const activityInput = document.createElement('input');
        const dateSelectionLabel = document.createElement('label');
        const dateSelection = document.createElement('select');
        const startTimeLabel = document.createElement('label');
        const startTimeInput = document.createElement('input');
        const endTimeLabel = document.createElement('label');
        const endTimeInput = document.createElement('input');
        const addButton = document.createElement('button');

        // Assign style(s) to HTML Element(s)
        cardBody.style = 'margin-bottom: 10;';
        startTimeLabel.style = 'margin-top: 12px;';
        endTimeLabel.style = 'padding-top: 0px;margin-top: 12px;';
        addButton.style = 'margin-top: 12px;';

        // Assign class name(s) to HTML Element(s)
        card.className = 'card';
        cardBody.className = 'card-body';
        cardTitle.className = 'card-title';
        activityLabel.className = 'form-label';
        activityInput.className = 'form-control';
        dateSelectionLabel.className = 'form-label';
        dateSelection.className = 'form-select';
        startTimeLabel.className = 'form-label';
        startTimeInput.className = 'form-control';
        endTimeLabel.className = 'form-label';
        endTimeInput.className = 'form-control';
        addButton.className = 'btn btn-primary d-block w-100';

        // Assign id to Form Element(s)
        activityInput.id = 'activityInput';
        dateSelection.id = 'dateSelection';
        startTimeInput.id = 'startTimeInput';
        endTimeInput.id = 'endTimeInput';

        // Assign properties to HTML ELement(s)
        cardTitle.innerText = 'Activity by Day';
        activityLabel.innerText = 'Activity:'
        activityLabel.type = 'text';
        activityInput.placeholder = 'Please input an activity description';
        dateSelectionLabel.innerText = 'Please select which day of the activity';
        Object.keys(this.tripData.activity).forEach((key) => {
            const option = document.createElement('option');
            option.value = key;
            option.innerText = "Day " + key;
            dateSelection.append(option);
        })
        startTimeLabel.innerText = 'Start Time:';
        startTimeInput.type = 'time';
        startTimeInput.min = '00:00';
        startTimeInput.max = '24:00';
        endTimeLabel.innerText = 'End Time:';
        endTimeInput.type = 'time';
        endTimeInput.min = '00:00';
        endTimeInput.max = '24:00';
        addButton.type = 'button';
        addButton.textContent = 'Add Activity';

        // Add event listener(s) to HTML Element(s)
        activityForm.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') e.preventDefault();
        })

        // Append Elements to Respective Containers
        activityForm.append(activityLabel, activityInput, dateSelectionLabel, dateSelection, startTimeLabel, startTimeInput, endTimeLabel, endTimeInput, addButton);
        cardBody.append(cardTitle, activityForm);
        card.append(cardBody);

        this.container.append(card);
    }

}

export default ActivityForm;