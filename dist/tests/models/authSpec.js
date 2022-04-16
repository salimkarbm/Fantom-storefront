"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../../services/authentication");
const store = new authentication_1.Authservices();
describe('Test Authentication', () => {
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
});
