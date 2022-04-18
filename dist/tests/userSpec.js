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
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../models/users");
const authentication_1 = require("../services/authentication");
const server_1 = __importDefault(require("../server"));
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
describe('User endpoint Testing', () => {
    const request = (0, supertest_1.default)(server_1.default);
    let token;
    // beforeAll(async () => {
    //   const result = await request
    //     .post('/users/login')
    //     .send({
    //       email: 'mark@gmail.com',
    //       password: 'password',
    //     })
    //     .set('Accept', 'application/json');
    //   token = result.text;
    //   token.replace(/\r?\n|\r/g, '');
    // });
    it('it expects /api/users to create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
            firstname: 'mark',
            lastname: 'anthony',
            password: 'password',
            email: 'mark@gmail.com',
        })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
    }));
    it('it expects /api/users to return a list of all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        console.log(response);
        expect(response.status).toEqual(200);
        expect(response).toBeInstanceOf(Array);
    }));
});
