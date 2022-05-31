const express = require('express');
const router = express.Router();
const macrozonascontrollers= require('../controllers/macrozonascontroller');

router.get('/', macrozonascontrollers.listmacr);
router.get('/:id',macrozonascontrollers.getmacrbyid ) ;
router.post('/', macrozonascontrollers.createmacr);
router.put('/:id', macrozonascontrollers.editmacr );
router.delete('/:id', macrozonascontrollers.deletemacr);
module.exports = router;