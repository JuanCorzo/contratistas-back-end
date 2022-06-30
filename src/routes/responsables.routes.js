const express = require('express');
const router = express.Router();
const responsablescontrollers= require('../controllers/responsablescontrollers');

router.get('/', responsablescontrollers.listcat);
router.get('/:id',responsablescontrollers.geticatbyid) ;
router.get('/aportante/:id',responsablescontrollers.geticatbyads) ;
router.post('/', responsablescontrollers.createcat);
router.put('/:id', responsablescontrollers.editcat);
router.delete('/:id', responsablescontrollers.deleteres);
module.exports = router;