export default class itemListModel {
    constructor(worker) {
        this.items = [];
        this.onChangeCallback = null;
        this.worker = worker;
    }

    add(item) {
        item.onChangeCallback = this.onChangeCallback;
        this.items.push(item);
    }

    delete(itemId) {
        const itemIndex = this.items.findIndex( (item) => item.id === itemId);
        this.items.splice(itemIndex, 1);
    }

    update({ id, ...rest }) {
        const item = this.items.find((item) => item.id === id);

        for (const key in rest) {
            if (rest.hasOwnProperty(key)) {
                item[key] = rest[key];
            }
        }
    }

    group() {
        this.worker.postMessage(JSON.parse(JSON.stringify(this.items)))
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}
