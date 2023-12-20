import HotelList from "./hotelList.js";

class Modal {
    constructor(results) {
        this.hotelModal = document.querySelector('div#hotel-modal');
        this.results = results;
    }
    render(title = 'Modal Title') {
        // Create HTML Element(s)
        const modalDialog = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalHeader = document.createElement('div');
        const modalBody = document.createElement('div');
        const modalFooter = document.createElement('div');
        const modalTitle = document.createElement('h4');
        const modalBodyText = document.createElement('p');
        const closeButton = document.createElement('button');
        const closeButton2 = document.createElement('button');
        const hotelList = new HotelList(this.results).render();

        // Assign class name(s) to HTML Element(s)
        modalDialog.className = 'modal-dialog';
        modalContent.className = 'modal-content';
        modalHeader.className = 'modal-header';
        modalBody.className = 'modal-body';
        modalFooter.className = 'modal-footer';
        modalTitle.className = 'modal-title';
        closeButton.className = 'btn-close';
        closeButton2.className = 'btn btn-light';

        // Assign properties to HTML ELement(s)
        modalDialog.role = 'document';
        modalTitle.textContent = title;
        modalBodyText.textContent = "Please select a hotel to add to the itinerary!";
        closeButton.type = 'button';
        closeButton.ariaLabel = 'Close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton2.type = 'button';
        closeButton2.innerText = 'Close';
        closeButton2.setAttribute('data-bs-dismiss', 'modal');

        // Add event listener(s) to HTML Element(s)
        closeButton.addEventListener('click', (e) => {
            this.hotelModal.className = this.hotelModal.className.replace('show', 'hide');
            this.hotelModal.style = 'display: none;';
            this.destroy();
            delete window[this];
        });

        closeButton2.addEventListener('click', (e) => {
            this.hotelModal.className = this.hotelModal.className.replace('show', 'hide');
            this.hotelModal.style = 'display: none;';
            this.destroy();
            delete window[this];
        });

        // Append Elements to Respective Containers
        modalHeader.append(modalTitle, closeButton);
        modalFooter.append(closeButton2);
        modalBody.append(modalBodyText, hotelList);
        modalContent.append(modalHeader, modalBody, modalFooter);
        modalDialog.append(modalContent);
        this.hotelModal.append(modalDialog);
        this.hotelModal.className = this.hotelModal.className.replace('hide', 'show');
        this.hotelModal.style = 'display: block;';

    }

    destroy() {
        this.hotelModal.innerHTML = "";
    }

}
export default Modal;