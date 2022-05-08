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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
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
    try {
        const currentOrder = yield store.currentOrders(req.params.id);
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
    app.post('/api/orders', authentication_1.default, create);
    app.get('/api/orders', authentication_1.default, index); //show all orders
    app.get('/api/orders/:id', authentication_1.default, show); //show a single order
    app.get('/api/users/:id/orders', authentication_1.default, showUserOrders); //show current orders by user (id)
    app.delete('/api/orders/:id', authentication_1.default, destroy);
    app.get('/api/users/:id/current-orders', authentication_1.default, currentOrders);
    app.get('/api/users/:id/complete-orders', authentication_1.default, completeOrders);
    app.post('/api/orders/:id/product/:id', authentication_1.default, addProduct);
};
exports.default = orderRoutes;
