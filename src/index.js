// import TOKEN from "./config.js";
import Landing from "./landing.js";
import Itinerary from "./itinerary.js";

let day;
let duration;
let durationInDate;

// Declare global container
let mainContainer;

// Data
let tripData = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
    /*
     *  INIT OF LANDING PAGE
     */

    // Initialize Container(s) Variable(s)
    mainContainer = document.querySelector('section#main-content');

    // Create Landing Background
    document.body.style = 'background: url("images/sunriseBackground.jpg") center / cover no-repeat;';

    // Initialize Landing Page
    const landing = new Landing(mainContainer);

    // Validate Rendering was successful
    if (landing.render() === true) {
        document.querySelector('button#submit').addEventListener('click', () => {
            if (landing.formValidation() === true) {
                tripData = landing.submit();
                landing.destroy();
                // console.log(data);
                const itinerary = new Itinerary(mainContainer, tripData);
                itinerary.render();
            }
        })
    }

    // @TODO: Add error handling page / feedback
}