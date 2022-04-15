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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const authentication_1 = require("./authentication");
const store = new users_1.UserStore();
const secret = process.env.TOKEN_SECRET;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
    };
    try {
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, secret);
        res.status(201).json({ token: token });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        if (!users) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email } = req.body;
    try {
        const updateUser = yield store.updateMe(req.params.id, firstname, lastname, email);
        res.status(200).json(updateUser);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield store.destroy(req.params.id);
        res.status(204).json({ message: 'deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const userRoutes = (app) => {
    app.post('/api/users', create);
    app.get('/api/users', authentication_1.verifyAuthToken, index);
    app.get('/api/users/:id', authentication_1.verifyAuthToken, show);
    app.post('/api/login', authentication_1.authenticate);
    app.patch('/api/users/:id', authentication_1.verifyAuthToken, updateMe);
    app.delete('/api/users/:id', authentication_1.verifyAuthToken, destroy);
};
exports.default = userRoutes;
