import productController from '../controller/productController'
import express from 'express';

const router = express.Router();

router
    .route('/')
    .get(productController().getAllProducts)

module.exports = router;