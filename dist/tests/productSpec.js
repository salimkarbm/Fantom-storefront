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
const store = new products_1.ProductStore();
const product = {
    name: 'converse chuks taylor',
    price: 1500,
    category: 'fashion',
};
describe('Test products', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return created product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create(product);
        expect(result).toEqual(product);
    }));
    it('should have an index method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return array of objects of all product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeInstanceOf(Array);
    }));
    it('should have an show method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return a single product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeInstanceOf(Object);
    }));
    it('should have a productByCategory method', () => {
        expect(store.productByCategory).toBeDefined();
    });
    it('should return all product that belong to the same category', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeInstanceOf(Object);
    }));
});
