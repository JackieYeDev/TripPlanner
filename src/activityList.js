class ActivityList {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
    }

    render() {
        const tableContainer = document.createElement('div');
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const timeHeader = document.createElement('th');
        const descriptionHeader = document.createElement('th');
        const tableBody = document.createElement('tbody');
        const paginationNav = document.createElement('nav');
        const ul = document.createElement('ul');

        tableContainer.className = 'table-responsive';
        table.className = 'table';
        ul.className = 'pagination';

        timeHeader.innerText = 'Time';
        descriptionHeader.innerText = 'Activity';

        headerRow.append(timeHeader, descriptionHeader);
        tableHeader.append(headerRow);

        for(let i = 1; i <= this.tripData.duration; i++) {
            const li = document.createElement('li');
            li.className = 'page-item';
            ul.append(li);
        }

        paginationNav.append(ul);

    }
}

// <tr>
//     <td>Cell1</td>
//     <td>Cell2</td>
// </tr>