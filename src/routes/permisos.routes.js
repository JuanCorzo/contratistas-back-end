const express = require('express');
const router = express.Router();

const permisoscontrollers= require('../controllers/permisoscontrollers');


router.get('/', permisoscontrollers.listperm);

// pemisos por id
router.get('/:id',permisoscontrollers.getipermyid) ;

// pemisos por rol
router.get('/rol/:id',permisoscontrollers.getpermpr) ;

// pemisos por menu
router.get('/menus/:id',permisoscontrollers.getperpm) ;


router.post('/', permisoscontrollers.createperm);

router.put('/:id', permisoscontrollers.editperm);

router.delete('/:id', permisoscontrollers.deleteperm);





module.exports = router;