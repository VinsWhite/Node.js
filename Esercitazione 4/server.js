"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRouter_1 = __importDefault(require("./route/productRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({ path: './config.env' });
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB)
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB ERROR 💣: ', error));
app.use('/api/v1/product', productRouter_1.default);
/* app.get('/', (req: Request, res: Response) => {
    console.log('Pagina iniziale');
    res.end('Ciao')
}) */
const port = parseInt(process.env.PORT || "3000", 10);
app.listen(port, () => {
    console.log(`Server on ${port}`);
});
