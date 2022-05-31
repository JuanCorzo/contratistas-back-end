
const express = require('express');
const router = express.Router();
const departamentoscontrollers= require('../controllers/departamentoscontrollers');

router.get('/', departamentoscontrollers.listdep);
router.get('/:id',departamentoscontrollers.getidepbyid) ;
router.get('/territorial/:id',departamentoscontrollers.getidepbyterr) ;
router.put('/:id', departamentoscontrollers.editdep);
router.put('/territorial/:id',departamentoscontrollers.editterr) ;
router.post('/', departamentoscontrollers.createdep);
router.delete('/:id', departamentoscontrollers.deletedep);

module.exports = router;