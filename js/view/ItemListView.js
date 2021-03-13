import ItemView from './ItemView.js';

export default class ItemListView {
    constructor(itemListModel, worker) {
        this.itemListModel = itemListModel;
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;
        this.controllerOnUpdateItem = null;
        this.controllerOnGroupItems = null;
        document.querySelector('#phonebook').addEventListener('click', (e) => this.onClick(e));
        worker.addEventListener('message', (e) => this.renderGroupedPhoneBook(e.data));
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    setControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }

    setControllerOnUpdate(controllerOnUpdateItem) {
        this.controllerOnUpdateItem = controllerOnUpdateItem;
    }

    setControllerOnGroupItems(controllerOnGroupItems) {
        this.controllerOnGroupItems = controllerOnGroupItems;
    }

    promptForNewValues(defaultLast = '', defaultPhone = '') {
        const lastName = prompt('Enter a new last name:', defaultLast);
        const phoneNumber = prompt('Enter a new phone number:', defaultPhone);

        return { lastName, phoneNumber }
    }

    onClick(e) {
        if (e.target.className === 'del-button') {
            this.controllerOnDelItem(e.target.dataset.id);
            return;
        }

        if (e.target.className === 'update-button') {
            const id = e.target.dataset.id;
            const item = this.itemListModel.items.find((item) => item.id === id);

            this.controllerOnUpdateItem({ id, ...this.promptForNewValues(item.lastName, item.phoneNumber) });
        }
    }

    onAddItem() {
        this.controllerOnAddItem(this.promptForNewValues());
    }

    onGroupItems() {
        this.controllerOnGroupItems();
    }

    toHtml() {
        const itemsHtml = this.itemListModel.items.map((item) => {
            const itemView = new ItemView(item);
            return itemView.toHtml();
        }).join('');
        return `<table border="1"><tr><th>Last Name</th><th>Phone Number</th><th>Operation</th></tr>${itemsHtml}</table>`;
    }

    renderGroupedPhoneBook({ grouped, sorted }) {
        const itemsHtml = sorted.map((lastName) => `
            <tr>
                <td>
                    ${lastName}
                </td>
                <td>
                    ${grouped[lastName].join('<br>')}                  
                </td>
            </tr>
        `).join('')

        document.querySelector('#groupedPhoneBook').innerHTML = `<table border="1"><tr><th>Last Name</th><th>Phone Numbers</th></tr>${itemsHtml}</table>`
    }
}
