"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const users_1 = require("./users");
const store = new orders_1.OrderStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        userId: String(req.user.id),
    };
    try {
        const orders = yield store.create(order);
        res.status(201).json(orders);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const showUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.showUserOrders(req.params.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderToDelete = yield store.destroy(req.params.id);
        res.status(204).json(orderToDelete);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const currentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = String(req.user.id);
    try {
        const currentOrder = yield store.currentOrders(userId);
        res.json(currentOrder);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const completeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completeOrder = yield store.completeOrders(req.params.id);
        res.json(completeOrder);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity, 10);
    try {
        const addProducts = yield store.addProduct(quantity, orderId, productId);
        res.status(200).json(addProducts);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const orderRoutes = (app) => {
    app.post('/api/orders', users_1.verifyAuthToken, create);
    app.get('/api/orders', users_1.verifyAuthToken, index); //show all orders
    app.get('/api/orders/:id', users_1.verifyAuthToken, show); //show a single order
    app.get('/api/users/:id/orders', users_1.verifyAuthToken, showUserOrders); //show current orders by user (id)
    app.delete('/api/orders/:id', users_1.verifyAuthToken, destroy);
    app.get('/api/current-orders', users_1.verifyAuthToken, currentOrders);
    app.get('/api/users/:id/complete-orders', users_1.verifyAuthToken, completeOrders);
    app.post('/api/orders/:id/product/:id', users_1.verifyAuthToken, addProduct);
};
exports.default = orderRoutes;
