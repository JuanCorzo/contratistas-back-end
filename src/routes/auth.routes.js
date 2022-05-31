/*Script : rutas de autenticación
*/
const express = require('express');
const router = express.Router();
const pool = require('../database');
const authcontroller= require('../controllers/authcontroller');



router.post('/login', authcontroller.login);
router.post('/registro', authcontroller.registro);




module.exports = router;