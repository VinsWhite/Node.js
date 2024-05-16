import { Product } from '../model/product';
import {Request, Response} from 'express';

const getAllProducts = async (req: Request, res: Response) => {
    
    try {
        
        const product = await Product.find();

        res.status(200).json ({
            status: 'success',
            data: {
                product
            }
        })

    } catch (error: any) {
        res.status(404).json ({
            status: 'fail',
            message: error.message,
        })
    }
}

export { getAllProducts };

const productController = () => {
    return { getAllProducts };
};

export default productController;