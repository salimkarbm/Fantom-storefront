"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import supertest from 'supertest';
const users_1 = require("../models/users");
const authentication_1 = require("../services/authentication");
//import app from '../server';
const store = new users_1.UserStore();
const auth = new authentication_1.Authservices();
describe('Test Users model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an updateMe method', () => {
        expect(store.updateMe).toBeDefined();
    });
    it('should have a destroy method', () => {
        expect(store.destroy).toBeDefined();
    });
    it('should have a destroy method', () => {
        expect(auth.authenticate).toBeDefined();
    });
});
