class ActivityList {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
        this.currentDay = 1;
    }

    render() {
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h4');
        const paginationNav = document.createElement('nav');
        const ul = document.createElement('ul');
        const leftChevronLi = document.createElement('li');
        const leftChevronA = document.createElement('a');
        const leftChevronSpan = document.createElement('span');
        const rightChevronLi = document.createElement('li');
        const rightChevronA = document.createElement('a');
        const rightChevronSpan = document.createElement('span');
        const tableContainer = document.createElement('div');

        // Assign style(s) to HTML Element(s)
        cardBody.style = 'margin-bottom: 10;';

        // Assign class name(s) to HTML Element(s)
        card.className = 'card';
        cardBody.className = 'card-body';
        cardTitle.className = 'card-title';
        tableContainer.className = 'table-responsive';
        paginationNav.className = 'd-flex justify-content-center';
        ul.className = 'pagination';
        leftChevronLi.className = 'page-item';
        leftChevronA.className = 'page-link';
        rightChevronLi.className = 'page-item';
        rightChevronA.className = 'page-link';

        // Assign id to HTML Element(s)
        tableContainer.id = 'activityTable';

        // Assign properties to HTML ELement(s)
        cardTitle.innerText = 'Itinerary';
        leftChevronSpan.innerText = '«';
        rightChevronSpan.innerText = '»';

        // Add event listener(s) to HTML Element(s)
        leftChevronA.addEventListener('click', () => {
            if(this.currentDay === 1) return;
            this.currentDay -= 1;
            const tableContainer = this.renderActivities(this.currentDay);
            const activityTable = document.getElementById('activityTable');
            activityTable.innerHTML = '';
            activityTable.append(tableContainer);
        })
        rightChevronA.addEventListener('click', () => {
            if(this.currentDay === this.tripData.duration) return;
            this.currentDay += 1;
            const tableContainer = this.renderActivities(this.currentDay);
            const activityTable = document.getElementById('activityTable');
            activityTable.innerHTML = '';
            activityTable.append(tableContainer);
        })

        // Append Elements to Respective Containers
        leftChevronA.append(leftChevronSpan);
        leftChevronLi.append(leftChevronA);
        ul.append(leftChevronLi);
        for (let i = 1; i <= this.tripData.duration; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const span = document.createElement('span');
            li.className = 'page-item';
            li.value = i;
            a.className = 'page-link';
            span.innerText = `${i}`
            a.addEventListener('click', () => {
                this.currentDay = i;
                const tableContainer = this.renderActivities(this.currentDay);
                const activityTable = document.getElementById('activityTable');
                activityTable.innerHTML = '';
                activityTable.append(tableContainer);
            })
            li.append(a);
            a.append(span);
            ul.append(li);
        }
        rightChevronA.append(rightChevronSpan);
        rightChevronLi.append(rightChevronA);
        ul.append(rightChevronLi);
        paginationNav.append(ul);
        tableContainer.append(this.renderActivities(this.currentDay));
        cardBody.append(cardTitle, tableContainer, paginationNav);
        card.append(cardBody);
        this.container.append(card);
    }

    renderActivities(day = 1) {
        if (this.tripData.activity[day].length === 0) return `There are no activities yet for Day ${day}.`;
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const timeHeader = document.createElement('th');
        const descriptionHeader = document.createElement('th');
        const tableBody = document.createElement('tbody');

        // Assign class name(s) to HTML Element(s)
        table.className = 'table';

        // Assign properties to HTML ELement(s)
        timeHeader.innerText = 'Time';
        descriptionHeader.innerText = 'Activity';

        this.tripData.activity[this.currentDay].forEach((item) => {
            const tr = document.createElement('tr');
            const timeTd = document.createElement('td');
            const descriptionTd = document.createElement('td');

            timeTd.innerText = `${item.startTime} to ${item.endTime}`;
            descriptionTd.innerText = `${item.description}`;

            tr.append(timeTd, descriptionTd);
            tableBody.append(tr);
        })

        // Append Elements to Respective Containers
        headerRow.append(timeHeader, descriptionHeader);
        tableHeader.append(headerRow);
        table.append(tableHeader, tableBody);

        return table;
    }
}

export default ActivityList;