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
fdescribe('Test Users', () => {
    const user = {
        firstName: 'michael',
        lastName: 'jordan',
        email: 'jordan@gmail.com',
        password: 'password',
    };
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should return created user', () => __awaiter(void 0, void 0, void 0, function* () {
        expectAsync(store.create(user)).toBeResolved();
    }));
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return a list of all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toEqual(0);
    }));
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should return a single user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(store.show('1')).toBeResolved();
    }));
    // it('should have an authenticate method', () => {
    //   expect(store.authenticate).toBeDefined();
    // });
    // it('should return token', async () => {
    //   const result = await store.authenticate(user.email, user.password);
    //   expect(result).toBeFalsy();
    // });
    it('should have an updateMe method', () => {
        expect(store.updateMe).toBeDefined();
    });
    // it('should return updated user', () => {
    //   expectAsync(
    //     store.updateMe('1', user.firstname, user.lastname, user.email)
    //   ).toBeResolved();
    // });
    it('should have a destroy method', () => {
        expect(store.destroy).toBeDefined();
    });
    it('should have a destroy method', () => {
        expectAsync(store.destroy('1')).toBeResolved();
    });
});
