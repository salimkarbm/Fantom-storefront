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
const store = new users_1.UserStore();
const secret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res
                .status(401)
                .json({ error: 'You are not logged in! please login to gain access.' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const currentUser = yield store.show(decoded.userId);
        if (!currentUser) {
            return res
                .status(401)
                .json({ message: 'The user belonging to this token no longer exist' });
        }
        req.user = currentUser;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'invalid token' });
    }
});
exports.default = verifyAuthToken;
