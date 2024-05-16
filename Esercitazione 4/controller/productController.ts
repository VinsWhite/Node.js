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

const getSingleProduct = async (req: Request, res: Response) => {
    try {

        const product = await Product.findById(req.params.id);

        res.status(200).json ({
            status: 'success',
            data: {
                product
            }
        })
    } catch (error: any) {
        res.status(404).json ({
            status: 'fail',
            message: error.message
        })
    }
}

const postAProduct = async (req: Request, res: Response) => {

    try {
        
        const product = await Product.create(req.body);

        res.status(201).json ({
            status: 'success',
            data: {
                product
            }
        })

    } catch (error: any) {
        res.status(404).json ({
            status: 'fail',
            message: error.message
        })
    }

}

const updateAProduct = async (req: Request, res: Response) => {

    try {
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json ({
            status: 'success',
            data: {
                product
            }
        })

    } catch (error: any) {
        res.status(404).json ({
            status: 'fail',
            message: error.message
        })
    }

}

const deleteAProduct = async (req: Request, res: Response) => {

    try {
        
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json ({
            status: 'success'
        })

    } catch (error: any) {
        res.status(404).json ({
            status: 'fail',
            message: error.message
        })
    }

}

const productController = () => {
    return { getAllProducts, postAProduct, getSingleProduct, updateAProduct, deleteAProduct };
};

export default productController;