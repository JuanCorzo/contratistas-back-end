const express = require('express');
const router = express.Router();
const ciudadescontrollers= require('../controllers/ciudadescontrollers');

router.get('/', ciudadescontrollers.listciu);
// ciudades por id
router.get('/:id',ciudadescontrollers.geticiubyid) ;
//ciudades por departamento
router.get('/departamento/:id',ciudadescontrollers.geticiubydep) ;
//ciudades por pais
router.get('/territorial/:id',ciudadescontrollers.geticiubyterr) ;
//ciudades por pais
router.get('/pais/:id',ciudadescontrollers.geticiubypa) ;
router.post('/', ciudadescontrollers.createciu);
router.put('/:id', ciudadescontrollers.editciu);
router.delete('/:id', ciudadescontrollers.delciu);

module.exports = router;