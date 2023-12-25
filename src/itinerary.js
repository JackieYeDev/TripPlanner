import HotelForm from "./hotelForm.js";
import ActivityForm from "./activityForm.js";

class Itinerary {
    constructor(container, tripData) {
        this.container = container;
        this.tripData = tripData;
    }

    render() {
        // Create HTML Element(s)
        const tripName = document.createElement('h2');
        const bodyContainer = document.createElement('div');
        const containerRowLayout = document.createElement('div');
        const containerLeftColLayout = document.createElement('div');
        const containerCenterColLayout = document.createElement('div');
        const containerRightColLayout = document.createElement('div');
        const leftCardGroup = document.createElement('div');

        // Assign class name(s) to HTML Element(s)
        bodyContainer.className = 'container-fluid text-start';
        containerRowLayout.className = 'row d-flex justify-content-center';
        containerLeftColLayout.className = 'col-lg-5';
        containerCenterColLayout.className = 'col-lg-2';
        containerRightColLayout.className = 'col-auto col-md-8 col-lg-5 col-xl-5 col-xxl-4';
        leftCardGroup.className = 'card-group';


        // Assign style(s) to HTML Element(s)
        tripName.style = 'text-align: center; margin-bottom: 12px;';
        leftCardGroup.style = 'display: grid; grid-gap: 8px;';


        // Assign properties to HTML ELement(s)
        tripName.textContent = this.tripData.tripNameInput;

        // Assign id to HTML Element(s)

        // Hotel Form
        const hotelForm = new HotelForm(leftCardGroup);
        hotelForm.render();

        // Activity Form
        const activityForm = new ActivityForm(leftCardGroup);
        activityForm.render();

        // Append Elements to Respective Containers
        containerLeftColLayout.append(leftCardGroup);
        containerRowLayout.append(containerLeftColLayout, containerCenterColLayout, containerRightColLayout);
        bodyContainer.append(containerRowLayout);
        this.container.append(tripName, bodyContainer);

    }
}
export default Itinerary;