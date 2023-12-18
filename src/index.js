// import TOKEN from "./config.js";
import Landing from "./landing.js";
import Itinerary from "./itinerary.js";

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

// <div className="modal-dialog" role="document">
//     <div className="modal-content">
//         <div className="modal-header">
//             <h4 className="modal-title">Modal Title</h4>
//             <button className="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
//         </div>
//         <div className="modal-body">
//             <p>The content of your modal.</p>
//         </div>
//         <div className="modal-footer">
//             <button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
//             <button className="btn btn-primary" type="button">Save</button>
//         </div>
//     </div>
// </div>