/*Script : rutas para funciones de administracion de usuarios
*/
const express = require('express');
const router = express.Router();
const userscontrollers= require('../controllers/userscontrollers');

router.get('/', userscontrollers.listuser);
router.get('/:id', userscontrollers.getuserbyid ) ;
router.get('/rol/:id', userscontrollers.listuserpr);
//router.post('/', authcontroller.registro);
router.put('/:id', userscontrollers.edituser );
router.put('/editamiusuario/:id', userscontrollers.edituser1 );
router.delete('/:id', userscontrollers.deleteuser);

module.exports = router;