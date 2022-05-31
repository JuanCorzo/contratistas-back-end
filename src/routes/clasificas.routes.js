const express = require('express');
const router = express.Router();
const clasificascontroller= require('../controllers/clasificascontroller');

router.get('/', clasificascontroller.listclas);
router.get('/:id',clasificascontroller.getclasbyid ) ;
router.post('/', clasificascontroller.createclas);
router.put('/:id', clasificascontroller.editclas );
router.delete('/:id', clasificascontroller.deleteclas);
module.exports = router;