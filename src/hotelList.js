class HotelList {
    constructor(list, tripData, callback) {
        this.list = list;
        this.tripData = tripData;
        this.callback = callback;
    }

    render(container) {
        if(this.list.length === 0) return "Unable to find hotel(s).";

        // Create HTML Element(s)
        const listGroup = document.createElement('ul');
        this.list.forEach((item, index) => {
            const listItem = document.createElement('li');
            const itemTitle = document.createElement('h5');
            const itemDiv = document.createElement('div');
            const itemDesc = document.createElement('span');
            const addButton = document.createElement('button');

            // Assign class name(s) to HTML Element(s)
            listItem.className = 'list-group-item';
            addButton.className = 'btn btn-primary float-end';

            // Assign id to HTML Element(s)
            listItem.id = `${index}`;

            // Assign properties to HTML ELement(s)
            itemTitle.textContent = item.name;
            itemDesc.textContent = item.location.formatted_address;
            addButton.textContent = "Add";

            // Add event listener(s) to HTML Element(s)
            addButton.addEventListener('click', ()=>{
                const searchButton = document.getElementById('searchButton');
                searchButton.setAttribute('disabled', true);
                this.tripData.hotelName = item.name;
                this.tripData.hotelAddress = item.location.formatted_address;
                container.innerHTML = "";
                container.style = 'display: none;';
                this.callback();
            });

            // Append Elements to Respective Containers
            itemDiv.append(itemDesc);
            listItem.append(itemTitle, itemDiv, addButton);
            listGroup.append(listItem);
        })

        // Assign class name(s) to HTML Element(s)
        listGroup.className = 'list-group';

        // Assign style(s) to HTML ELement(s)
        listGroup.style = 'list-style-type: none;';

        return listGroup;
    }
}

export default HotelList;