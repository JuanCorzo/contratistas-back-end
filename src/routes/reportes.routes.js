
const express = require('express');
const router = express.Router();
const reportescontrollers= require('../controllers/reportescontrollers');

router.get('/', reportescontrollers.dashboard);
router.get('/filtro3/:idsec/:idesn/:idcla/:idmac/:idter/:iddep/:idciu/:repor/:idora', reportescontrollers.geticatbyfiltro3);
router.get('/filtro4/:idsec/:idesn/:idcla/:idmac/:idter/:iddep/:idciu/:repor/:idora', reportescontrollers.geticatbyfiltro4);
router.get('/filtro5/:idapo', reportescontrollers.geticatbyfiltro5);
router.get('/filtro6/:idapo', reportescontrollers.geticatbyfiltro6);
router.get('/filtro7/:idapo/:tipo', reportescontrollers.geticatbyfiltro7);
router.get('/mapasx',reportescontrollers.getmapa);
router.get('/zonarepo/:idmac',reportescontrollers.zonarepo);
router.get('/zonarepo2/:idter',reportescontrollers.zonarepo2);
router.get('/terrsinfiltro',reportescontrollers.geticatsinfiltro);
module.exports = router;