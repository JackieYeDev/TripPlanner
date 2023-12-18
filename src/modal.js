class Modal {
    constructor() {
        this.hotelModal = document.querySelector('div#hotel-modal');
    }
    render(title = 'Modal Title') {
        const modalDialog = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalHeader = document.createElement('div');
        const modalBody = document.createElement('div');
        const modalFooter = document.createElement('div');
        const modalTitle = document.createElement('h4');
        const closeButton = document.createElement('button');
        const closeButton2 = document.createElement('button');
        const addButton = document.createElement('button');

        modalDialog.className = 'modal-dialog';
        modalContent.className = 'modal-content';
        modalHeader.className = 'modal-header';
        modalBody.className = 'modal-body';
        modalFooter.className = 'modal-footer';
        modalTitle.className = 'modal-title';
        closeButton.className = 'btn-close';
        closeButton2.className = 'btn btn-light';
        addButton.className = 'btn btn-primary';


        modalDialog.role = 'document';
        modalTitle.textContent = title;
        closeButton.type = 'button';
        closeButton.ariaLabel = 'Close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton2.type = 'button';
        closeButton2.innerText = 'Close';
        closeButton2.setAttribute('data-bs-dismiss', 'modal');
        addButton.type = 'button';
        addButton.innerText = 'Add Hotel';

        closeButton.addEventListener('click', (e) => {
            this.hotelModal.className = this.hotelModal.className.replace('show', 'hide');
            this.hotelModal.style = 'display: none;';
        });

        closeButton2.addEventListener('click', (e) => {
            this.hotelModal.className = this.hotelModal.className.replace('show', 'hide');
            this.hotelModal.style = 'display: none;';
        });

        modalHeader.append(modalTitle, closeButton);
        modalFooter.append(closeButton2, addButton);
        modalContent.append(modalHeader, modalBody, modalFooter);
        modalDialog.append(modalContent);
        this.hotelModal.append(modalDialog);
        this.hotelModal.className = this.hotelModal.className.replace('hide', 'show');
        this.hotelModal.style = 'display: block;';
    }

}
export default Modal;