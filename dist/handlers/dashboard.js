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
const dashboard_1 = __importDefault(require("../services/dashboard"));
const service = new dashboard_1.default();
const topFivePopularProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield service.popularProducts();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const dashboardRoutes = (app) => {
    app.get('/products/info/top-5-products', topFivePopularProducts);
};
exports.default = dashboardRoutes;
