const express = require('express');
const animaliController = require('../controller/animaliController');
// import * as animaliController from "../controller/animaliContoller";

// app.use('/api/v1/animali', router);
const router = express.Router();

router.route('/')
    .get(animaliController.getAllAnimali)
    .post(animaliController.createAnimale);


module.exports = router;