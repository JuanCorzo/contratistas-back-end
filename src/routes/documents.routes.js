const express = require('express');
const router = express.Router();

const {documents} = require('../middlewares/index');
const documentscontrollers= require('../controllers/documentscontrollers');

router.get('/descargaruno/:id', documentscontrollers.downloaduno)

router.post('/subiruno', documents.storagesingle, documentscontrollers.uploaduno);






module.exports = router;