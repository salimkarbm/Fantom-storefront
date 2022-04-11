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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                email: user.email,
            };
            const saltRound = parseInt(process.env.SALT_ROUNDS, 10);
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname, lastname, password_digest, email) VALUES($1, $2, $3, $4) RETURNING * ';
                const hash = yield bcrypt_1.default.hash(newUser.password + pepper, saltRound);
                const result = yield conn.query(sql, [
                    newUser.firstName,
                    newUser.lastName,
                    hash,
                    newUser.email,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create user ${newUser.firstName},${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable to fetch users from database ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id=${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`unable find user with id ${id}. ${err}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT id, email, password_digest FROM users WHERE email='${email}'`;
                const result = yield conn.query(sql);
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    if (yield bcrypt_1.default.compare(password + pepper, user.password_digest)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Unable to authenticate user ${err}`);
            }
        });
    }
    updateMe(id, firstname, lastname, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE users SET firstname=($1), lastname=($2), email=($3) WHERE id=${id} RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [firstname, lastname, email]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Something went wrong unable to update user with Email: ${email}, ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM users WHERE id=${id} RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Unable to delete user with ${id}, Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
