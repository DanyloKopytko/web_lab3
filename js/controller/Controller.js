import Item from "../model/Item.js";

export default class Controller {
    constructor(itemListModel, itemListView) {
        this.itemListModel = itemListModel;
        this.itemListView = itemListView;
        this.itemListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.itemListView.setControllerOnAddItem(this.addItem);
        this.itemListView.setControllerOnDelItem(this.delItem);
        this.itemListView.setControllerOnUpdate(this.updateItem);
        this.itemListView.setControllerOnGroupItems(this.groupItems);
        this.initOnModelChange();
        document.querySelector('#add-item').addEventListener('click', () => itemListView.onAddItem());
        document.querySelector('#group-items').addEventListener('click', () => itemListView.onGroupItems());
    }

    onChangeCallback() {
        document.querySelector('#phonebook').innerHTML = this.itemListView.toHtml();
    }


    addItem({ lastName, phoneNumber }) {
        const item = new Item({ lastName, phoneNumber });
        this.itemListModel.add(item);
    }

    delItem(id) {
        this.itemListModel.delete(id);
    }

    updateItem({ id, lastName, phoneNumber }) {
        this.itemListModel.update({ id, lastName, phoneNumber });
    }

    groupItems() {
        this.itemListModel.group();
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#phonebook').innerHTML = this.itemListView.toHtml();
                return true;
            }
        }
        this.itemListModel.items = new Proxy(this.itemListModel.items, handler);
    }
}
