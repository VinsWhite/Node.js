import productController from '../controller/productController'
import express from 'express';

const router = express.Router();

router
    .route('/')
    .get(productController().getAllProducts)
    .post(productController().postAProduct);

router 
    .route('/:id')
    .get(productController().getSingleProduct)
    .patch(productController().updateAProduct)
    .delete(productController().deleteAProduct);

export default router;