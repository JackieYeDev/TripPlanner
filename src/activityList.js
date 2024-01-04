class ActivityList {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
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

        // Assign properties to HTML Element(s)
        cardTitle.innerText = 'Itinerary';
        leftChevronSpan.innerText = '«';
        rightChevronSpan.innerText = '»';

        // Add event listener(s) to HTML Element(s)
        leftChevronA.addEventListener('click', () => {
            if(this.tripData.currentDay() === 1) return;
            this.tripData.decrementCurrentDay();
            this.renderActivities();
        })
        rightChevronA.addEventListener('click', () => {
            if(this.tripData.currentDay() === this.tripData.duration) return;
            this.tripData.incrementCurrentDay();
            this.renderActivities();
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
                this.tripData.currentDay(i);
                this.renderActivities();
            })
            li.append(a);
            a.append(span);
            ul.append(li);
        }
        rightChevronA.append(rightChevronSpan);
        rightChevronLi.append(rightChevronA);
        ul.append(rightChevronLi);
        paginationNav.append(ul);
        cardBody.append(cardTitle, tableContainer, paginationNav);
        card.append(cardBody);
        this.container.append(card);
    }

    renderActivities() {
        const tableContainer = document.getElementById('activityTable');
        tableContainer.innerHTML = '';
        if (this.tripData.activity[this.tripData.currentDay()].length > 0) {
            const table = document.createElement('table');
            const tableHeader = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const timeHeader = document.createElement('th');
            const descriptionHeader = document.createElement('th');
            const tableBody = document.createElement('tbody');

            // Assign class name(s) to HTML Element(s)
            table.className = 'table';

            // Assign properties to HTML Element(s)
            timeHeader.innerText = 'Time';
            descriptionHeader.innerText = 'Activity';

            this.tripData.activity[this.tripData.currentDay()].forEach((item) => {
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
            tableContainer.append(table);
        } else {
            tableContainer.append(`There are no activities yet for Day ${this.tripData.currentDay()}.`);
        }
    }

    registerCallback() {
        return this.renderActivities;
    }
}

export default ActivityList;