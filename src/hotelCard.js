class HotelCard {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
    }

    render() {
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('h4');
        const hotelName = document.createElement('h5');
        const hotelDiv = document.createElement('div');
        const hotelDesc = document.createElement('span');

        // Assign style(s) to HTML Element(s)
        cardBody.style = 'margin-bottom: 10;';

        // Assign class name(s) to HTML Element(s)
        card.className = 'card';
        cardBody.className = 'card-body';
        cardTitle.className = 'card-title';

        // Assign properties to HTML ELement(s)
        cardTitle.innerText = 'Hotel';
        hotelName.innerText = `${this.tripData.hotelName}`;
        hotelDesc.innerText = `${this.tripData.hotelAddress}`;

        // Append Elements to Respective Containers
        hotelDiv.append(hotelName, hotelDesc);
        cardBody.append(cardTitle, hotelDiv);
        card.append(cardBody);
        this.container.append(card);
    }
}

export default HotelCard;