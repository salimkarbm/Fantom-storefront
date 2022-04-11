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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price, category) VALUES($1,$2, $3) RETURNING *';
                const values = [product.name, product.price, product.category];
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, values);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create product ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to fetch products from database ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products WHERE id=${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`unable to find products with id ${id}. Error: ${err}`);
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE products SET name=($1), price=($2), category=($3) WHERE id = ${id} RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                ]);
                console.log(result);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Something went wrong unable to update product with ID:${id}`);
            }
        });
    }
    productByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products WHERE category='${category}'`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`${category} does not exist.${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
