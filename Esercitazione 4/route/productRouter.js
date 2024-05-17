"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = __importDefault(require("../controller/productController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .route('/')
    .get((0, productController_1.default)().getAllProducts)
    .post((0, productController_1.default)().postAProduct);
router
    .route('/:id')
    .get((0, productController_1.default)().getSingleProduct)
    .patch((0, productController_1.default)().updateAProduct)
    .delete((0, productController_1.default)().deleteAProduct);
exports.default = router;
