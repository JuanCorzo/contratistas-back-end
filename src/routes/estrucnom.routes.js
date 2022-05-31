

const express = require('express');
const router = express.Router();
const estructuranominacontrollers= require('../controllers/estructuranominacontrollers');


router.get('/', estructuranominacontrollers.listcat);
router.get('/nomin/', estructuranominacontrollers.listest);

router.get('/:id',estructuranominacontrollers.geticatbyid) ;

router.post('/', estructuranominacontrollers.createcat);

router.put('/:id', estructuranominacontrollers.editcat);

router.delete('/:id', estructuranominacontrollers.delete);





module.exports = router;