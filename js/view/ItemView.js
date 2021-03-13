export default class ItemView {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }

    toHtml() {
        return `
            <tr>
                <td>
                    ${this.itemModel.lastName}
                </td>
                <td>
                    ${this.itemModel.phoneNumber}                  
                </td>
                <td>
                    <button data-id="${this.itemModel.id}" class="del-button">Delete</button>
                    <button data-id="${this.itemModel.id}" class="update-button">Update</button>
                </td>
            </tr>`;
    }
}
