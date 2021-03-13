import ItemListModel from './model/ItemListModel.js';
import ItemListView from './view/ItemListView.js';
import Controller from './controller/Controller.js';

const worker = new Worker('js/workers/PhoneWorker.js');

const itemListModel = new ItemListModel(worker);
const itemListView = new ItemListView(itemListModel, worker);

const controller = new Controller(itemListModel, itemListView);

controller.addItem({ lastName: 'Tsar', phoneNumber: '096-159-68-25' });
controller.addItem({ lastName: 'Tsar', phoneNumber: '097-333-22-22' });
controller.addItem({ lastName: 'Yaroslav', phoneNumber: '096-228-13-37' });
controller.addItem({ lastName: 'Yaroslav', phoneNumber: '097-231-78-56' });
controller.addItem({ lastName: 'Syomadog', phoneNumber: '063-218-56-35' });
controller.addItem({ lastName: 'Syomadog', phoneNumber: '063-211-21-59' });
