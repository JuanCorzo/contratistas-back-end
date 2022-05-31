
const express = require('express');
const router = express.Router();
const paisescontrollers= require('../controllers/paisescontrollers');

router.get('/', paisescontrollers.listpa);
router.get('/:id',paisescontrollers.getipabyid) ;
router.put('/:id', paisescontrollers.editpa);
router.post('/', paisescontrollers.createpa);
router.delete('/:id', paisescontrollers.deletepa);

module.exports = router;