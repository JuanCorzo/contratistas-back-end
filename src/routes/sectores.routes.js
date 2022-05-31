
const express = require('express');
const router = express.Router();
const sectorescontrollers= require('../controllers/sectorescontrollers');


router.get('/', sectorescontrollers.listcat);

router.get('/:id',sectorescontrollers.geticatbyid) ;

router.post('/', sectorescontrollers.createcat);

router.put('/:id', sectorescontrollers.editcat);

router.delete('/:id', sectorescontrollers.delete);





module.exports = router;