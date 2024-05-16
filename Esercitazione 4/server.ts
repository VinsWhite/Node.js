import express, {Request, Response} from 'express';
const productRoute = require('./route/productRoute')
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

mongoose.connect(DB!)
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB ERROR 💣: ', error));

app.use('/api/v1/product', productRoute);

/* app.get('/', (req: Request, res: Response) => {
    console.log('Pagina iniziale');
    res.end('Ciao')
}) */

const port: number = parseInt(process.env.PORT || "3000", 10);

app.listen(port, () => {
    console.log(`Server on ${port}`)
})