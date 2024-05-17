import { Product } from '../model/product';
import {Request, Response} from 'express';

interface queryString {
    [key: string]: string | number // key è il nome della chiave, string è il tipo
    // string e number sono i tipi di valori che può avere la chiave
}

class APIProduct { // in typescript bisogna dichiarare le variabili esplicitamente prima di usarle
    constructor(public query: any, private queryString: any) {
        this.query = query,
        this.queryString = queryString
    }

    filter() {
        const queryBody: queryString = {...this.queryString};
        const excludeFields: string[] = ['page', 'sort', 'limit', 'fields'];

        excludeFields.forEach(el => delete queryBody[el]);

        let queryStr: string = JSON.stringify(queryBody); // trasformo in una stringa
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));

        return this;
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    
    try {
        
        /* const products = await Product.find(); */
        const apiProduct = new APIProduct (Product.find(), req.query).filter();
        const products = await apiProduct.query;

        res.status(200).json ({
            status: 'success',
            data: {
                products
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