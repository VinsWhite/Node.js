const express = require('express');
const animaliController = require('../controller/animaliController');
// import * as animaliController from "../controller/animaliContoller";

// app.use('/api/v1/animali', router);
const router = express.Router();

router.route('/')
    .get(animaliController.getAllAnimali)
    .post(animaliController.createAnimale);

router.route('/:id')
    .get(animaliController.getSingleAnimale)
    .patch(animaliController.updateAnimali)
    .delete(animaliController.deleteAnimale);


module.exports = router;