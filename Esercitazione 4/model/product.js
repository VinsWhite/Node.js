"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "it's required"],
        trim: true, // toglie gli spazi alla fine della stringa
        minLength: [2, 'min 2 char'],
        maxLength: [40, 'max 40 char']
    },
    description: {
        type: String,
        require: [true, "it's required"],
        trim: true,
        minLength: [20, 'min 20 char'],
        maxLength: [255, 'max 255 char']
    },
    price: {
        type: Number,
        require: [true, "it's required"],
        trim: true,
        min: [1, 'min 1'],
        max: [10.000, 'max 10.000']
    },
    category: {
        type: String,
        require: [true, "it's required"],
        trim: true,
        minLength: [2, 'min 2 char'],
        maxLength: [20, 'max 20 char']
    },
    image: {
        type: String,
        /* require: [true, "it's required"] */
    }
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
