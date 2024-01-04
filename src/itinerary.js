import HotelForm from "./hotelForm.js";
import ActivityForm from "./activityForm.js";
import ActivityList from "./activityList.js";
import HotelCard from "./hotelCard.js";

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
        const rightCardGroup = document.createElement('div');

        // Assign class name(s) to HTML Element(s)
        bodyContainer.className = 'container-fluid text-start';
        containerRowLayout.className = 'row d-flex justify-content-center';
        containerLeftColLayout.className = 'col-lg-5';
        containerCenterColLayout.className = 'col-lg-2';
        containerRightColLayout.className = 'col-lg-5';
        leftCardGroup.className = 'card-group';
        rightCardGroup.className = 'card-group';


        // Assign style(s) to HTML Element(s)
        tripName.style = 'text-align: center; margin-bottom: 12px;';
        leftCardGroup.style = 'display: grid; grid-gap: 8px;';
        rightCardGroup.style = 'display: grid; grid-gap: 8px;';


        // Assign properties to HTML ELement(s)
        tripName.textContent = this.tripData.tripName;

        // Assign id to HTML Element(s)

        // Hotel Card
        const hotelCard = new HotelCard(rightCardGroup, this.tripData);
        hotelCard.render();
        const updateHotelCard = hotelCard.registerCallback();

        // Activity List
        const activityList =  new ActivityList(rightCardGroup, this.tripData);
        activityList.render();
        const updateActivityList = activityList.registerCallback()

        // Hotel Form
        const hotelForm = new HotelForm(leftCardGroup, this.tripData, updateHotelCard);
        hotelForm.render();

        // Activity Form
        const activityForm = new ActivityForm(leftCardGroup, this.tripData, updateActivityList);
        activityForm.render();

        // Append Elements to Respective Containers
        containerLeftColLayout.append(leftCardGroup);
        containerRightColLayout.append(rightCardGroup);
        containerRowLayout.append(containerLeftColLayout, containerCenterColLayout, containerRightColLayout);
        bodyContainer.append(containerRowLayout);
        this.container.append(tripName, bodyContainer);

    }
}
export default Itinerary;