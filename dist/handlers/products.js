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
const products_1 = require("../models/products");
const users_1 = require("./users");
const store = new products_1.ProductStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = yield store.create(product);
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const updatedProduct = yield store.update(req.params.id, product);
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productDelete = yield store.destroy(req.params.id);
        res.status(204).json(productDelete);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const ProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        const product = yield store.productByCategory(category);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const productRoutes = (app) => {
    app.post('/api/products', users_1.verifyAuthToken, create);
    app.get('/api/products', index);
    app.get('/api/products/:id', show);
    app.patch('/api/products/:id', users_1.verifyAuthToken, update);
    app.patch('/api/products/:id', users_1.verifyAuthToken, destroy);
    app.get('/api/product', ProductByCategory);
};
exports.default = productRoutes;
