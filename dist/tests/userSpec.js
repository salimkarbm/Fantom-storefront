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
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const user = {
    email: 'example@gmail.com',
    password: '1234',
};
describe('Test Users', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return created user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(store.create(user)).toBeResolved();
    }));
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return an list of all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeInstanceOf(Array);
    }));
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return a single user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(store.index()).toBeResolved();
    }));
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('should return token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate(user.email, user.password);
        expect(result).toBeFalsy();
    }));
});
