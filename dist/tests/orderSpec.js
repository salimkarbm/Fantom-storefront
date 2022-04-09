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
const store = new orders_1.OrderStore();
const order = {
    id: '1',
    status: 'pending',
    userId: '15',
};
describe('Test products', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return created order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(store.create(order)).toBeResolved();
    }));
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return created order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(store.create(order)).toBeResolved();
    }));
});
