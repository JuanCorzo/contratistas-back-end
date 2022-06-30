const express = require('express');
const router = express.Router();
const clasificacionesaportantescontrolles= require('../controllers/clasificacionesaportantescontrolles');

router.get('/sel/', clasificacionesaportantescontrolles.listcatsel);
router.get('/', clasificacionesaportantescontrolles.listcat);
router.get('/:id',clasificacionesaportantescontrolles.geticatbyid) ;
router.post('/', clasificacionesaportantescontrolles.createcat);
router.put('/:id', clasificacionesaportantescontrolles.editcat);
router.delete('/:id', clasificacionesaportantescontrolles.delete);

module.exports = router;