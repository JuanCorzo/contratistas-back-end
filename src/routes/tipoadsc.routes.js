
const express = require('express');
const router = express.Router();
const tipoadscritacontrollers= require('../controllers/tipoadscritacontrollers');
router.get('/', tipoadscritacontrollers.listcat);
router.get('/sel/', tipoadscritacontrollers.listcatsel);
router.get('/:id',tipoadscritacontrollers.geticatbyid) ;
router.post('/', tipoadscritacontrollers.createcat);
router.put('/:id', tipoadscritacontrollers.editcat);
router.delete('/:id', tipoadscritacontrollers.delete);
module.exports = router;