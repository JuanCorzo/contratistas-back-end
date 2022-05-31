

const express = require('express');
const router = express.Router();
const aportesmunicipios= require('../controllers/aportesmunicipios');


router.get('/', aportesmunicipios.listcat);

router.get('/:id',aportesmunicipios.geticatbyid) ;



router.post('/', aportesmunicipios.createcat);

router.put('/:id', aportesmunicipios.editcat);

router.delete('/:id', aportesmunicipios.delete);





module.exports = router;