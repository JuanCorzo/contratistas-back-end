const express = require('express');
const router = express.Router();
const tiposdocumentoscontrollers= require('../controllers/tiposdocumentoscontrollers');

router.get('/', tiposdocumentoscontrollers.listcat);
router.get('/:id',tiposdocumentoscontrollers.geticatbyid) ;
router.post('/', tiposdocumentoscontrollers.createcat);
router.put('/:id', tiposdocumentoscontrollers.editcat);
router.delete('/:id', tiposdocumentoscontrollers.delete);

module.exports = router;