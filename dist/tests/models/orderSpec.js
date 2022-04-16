"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const store = new orders_1.OrderStore();
describe('Test products', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a showUserOrder method', () => {
        expect(store.showUserOrders).toBeDefined();
    });
    it('should have a currentOrder method', () => {
        expect(store.currentOrders).toBeDefined();
    });
    it('should have a completeOrder method', () => {
        expect(store.completeOrders).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.destroy).toBeDefined();
    });
    it('should have a addP mroductethod', () => {
        expect(store.addProduct).toBeDefined();
    });
});
