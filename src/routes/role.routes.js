/*Script : rutas de roles
*/
const express = require('express');
const router = express.Router();

const rolescontrollers= require('../controllers/rolescontrollers');

router.get('/', rolescontrollers.listrole);
router.get('/:id',rolescontrollers.getrolebyid ) ;
router.post('/', rolescontrollers.createrole);
router.put('/:id', rolescontrollers.editrole );
router.delete('/:id', rolescontrollers.deleterole);

module.exports = router;