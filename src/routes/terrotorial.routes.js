

const express = require('express');
const router = express.Router();
const territorialcontrollers= require('../controllers/territorialcontrollers');

router.get('/', territorialcontrollers.listdep);
router.get('/:id',territorialcontrollers.getidepbyid) ;
router.get('/pais/:id',territorialcontrollers.getidepbypais) ;
router.put('/:id', territorialcontrollers.editdep);
router.post('/', territorialcontrollers.createdep);
router.post('/macrozonas', territorialcontrollers.listamacrozonas);
router.delete('/:id', territorialcontrollers.deletedep);

module.exports = router;