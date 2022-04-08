"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.saltRound = exports.pepper = exports.secret = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secret = process.env.TOKEN_SECRET;
console.log(exports.secret);
exports.pepper = process.env.BCRYPT_PASSWORD;
exports.saltRound = parseInt(process.env.SALT_ROUNDS, 10);
exports["default"] = jsonwebtoken_1["default"];
