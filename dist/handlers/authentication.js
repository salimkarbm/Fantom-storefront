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
const authentication_1 = require("../services/authentication");
const authstore = new authentication_1.Authservices();
const secret = process.env.TOKEN_SECRET;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        password: req.body.password,
        email: req.body.email,
    };
    if (!user.email || !user.password) {
        return res
            .status(400)
            .json({ message: 'please provide valid email and password' });
    }
    try {
        const authenticateUser = yield authstore.authenticate(user.email, user.password);
        if (authenticateUser === null) {
            return res.status(401).json({ message: 'incorrect password or email' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: authenticateUser.id }, secret);
        res.status(200).json(token);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.default = authenticate;
