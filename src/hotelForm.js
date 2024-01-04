import HotelModal from "./hotelModal.js";
class HotelForm {

    constructor(container, tripData, callback) {
        this.container = container;
        this.tripData = tripData;
        this.callback = callback;
    }

    render() {
        // Create HTML Element(s)
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h4');
        const hotelForm = document.createElement('form');
        const locationLabel = document.createElement('label');
        const locationInput = document.createElement('input');
        // const checkInDateLabel = document.createElement('label');
        // const checkInDateInput = document.createElement('input');
        // const checkOutDateLabel = document.createElement('label');
        // const checkOutDateInput = document.createElement('input');
        const searchButton = document.createElement('button');

        // Assign style(s) to HTML Element(s)
        cardBody.style = 'margin-bottom: 10;';
        // checkInDateLabel.style = 'margin-top: 12px;';
        // checkOutDateLabel.style = 'padding-top: 0px;margin-top: 12px;';
        searchButton.style = 'margin-top: 12px;';

        // Assign class name(s) to HTML Element(s)
        card.className = 'card';
        cardBody.className = 'card-body';
        cardTitle.className = 'card-title';
        locationLabel.className = 'form-label';
        locationInput.className = 'form-control';
        // checkInDateLabel.className = 'form-label';
        // checkInDateInput.className = 'form-control';
        // checkOutDateLabel.className = 'form-label';
        // checkOutDateInput.className = 'form-control';
        searchButton.className = 'btn btn-primary d-block w-100';

        // Assign id to Form Element(s)
        locationInput.id = 'locationInput';
        searchButton.id = 'searchButton';
        // checkInDateInput.id = 'checkInDateInput';
        // checkOutDateInput.id = 'checkOutDateInput';

        // Assign properties to HTML ELement(s)
        cardTitle.innerText = 'Hotel Search by Location';
        locationLabel.innerText = 'Location:'
        locationInput.type = 'text';
        locationInput.placeholder = 'Please input a location';
        // checkInDateLabel.innerText = 'Check In Date:';
        // checkInDateInput.type = 'date';
        // checkOutDateLabel.innerText = 'Check Out Date:';
        // checkOutDateInput.type = 'date';
        searchButton.type = 'button';
        searchButton.textContent = 'Search';

        // Add event listener(s) to HTML Element(s)
        searchButton.addEventListener('click', (e) => {
            if(locationInput.value === "") return;
            this.queryHotels(locationInput.value)
                .then((results) => {
                    const modal = new HotelModal(results, this.tripData, this.callback);
                    modal.render("Hotel Result Search");
                })
        })

        hotelForm.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') e.preventDefault();
        })


        // Append Elements to Respective Containers
        hotelForm.append(locationLabel, locationInput, searchButton);
        // hotelForm.append(locationLabel, locationInput, checkInDateLabel, checkInDateInput, checkOutDateLabel, checkOutDateInput, searchButton);
        cardBody.append(cardTitle, hotelForm);
        card.append(cardBody);

        this.container.append(card);
    }

    async queryHotels(query){
        const configuration = {
            mode: "cors",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        try {
            const jsonData = await fetch("https://proxyservertripplanner.onrender.com/hotels/"+query, configuration)
                .then(response => response.json())
                .then(data => data)
                .catch(err => console.error(err));
            return jsonData.results.slice(0, 6);
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default HotelForm;