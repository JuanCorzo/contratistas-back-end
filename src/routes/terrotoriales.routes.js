

const express = require('express');
const router = express.Router();
const territorialescontrollers= require('../controllers/territorialescontrollers');


router.get('/', territorialescontrollers.listdep);

router.get('/:id',territorialescontrollers.getidepbyid) ;

router.get('/pais/:id',territorialescontrollers.getidepbypais) ;

router.put('/:id', territorialescontrollers.editdep);

router.post('/', territorialescontrollers.createdep);

router.post('/macrozonas', territorialescontrollers.listamacrozonas);






module.exports = router;