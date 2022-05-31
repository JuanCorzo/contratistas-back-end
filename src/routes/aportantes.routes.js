const express = require('express');
const router = express.Router();
const aportantescontrollers= require('../controllers/aportantescontrollers');

router.get('/', aportantescontrollers.listcat);
router.get('/:id',aportantescontrollers.geticatbyid) ;
router.get('/sector/:id',aportantescontrollers.geticatbysector) ;
router.get('/clasificacion/:id',aportantescontrollers.geticatbyclasificacion);
router.get('/estructuranomina/:id',aportantescontrollers.geticatbyesnom);
router.get('/tipoadscrita/:id',aportantescontrollers.geticatbytipoads);
router.get('/ciudad/:id',aportantescontrollers.geticatbyciu);
router.get('/departamento/:id',aportantescontrollers.geticatbydep);
router.get('/territorial/:id',aportantescontrollers.geticatbyterr);
router.get('/pais/:id',aportantescontrollers.geticatbypais);
router.get('/filtros/:idcla/:idesn/:idsec/:iddep/:idciu',aportantescontrollers.geticatbyfiltro);
router.get('/filtros2/:idsec/:idesn/:idcla/:idmac/:idter/:iddep/:idciu/:idora',aportantescontrollers.geticatbyfiltro2);
router.get('/filtrospanel/:idsec/:idesn/:idcla/:idmac/:idter/:iddep/:idciu/:idora',aportantescontrollers.geticatbyfiltropanel);
router.get('/filtrospanel2/:idsec/:idesn/:idcla/:idmac/:idter/:iddep/:idciu/:idora',aportantescontrollers.geticatbyfiltropanel2);

router.get('/territoriales/macro',aportantescontrollers.getmacros);
router.get('/territoriales/terri',aportantescontrollers.getmaterrim);
router.get('/territoriales/terri2',aportantescontrollers.getultid);
router.get('/territoriales/depar/:id',aportantescontrollers.getdepater);
router.get('/territoriales/:id',aportantescontrollers.getterriid);
router.get('/territoriales/macro/:id',aportantescontrollers.getterrmacro);
router.get('/departamento/:id',aportantescontrollers.getaportdep);
router.get('/ejecutoras/:nit',aportantescontrollers.aporficha);

router.post('/', aportantescontrollers.createcat);
router.post('/territoriales', aportantescontrollers.createter);

router.put('/:id', aportantescontrollers.editcat);
router.put('/territoriales', aportantescontrollers.editter);
router.put('/editaclasifica/:id', aportantescontrollers.editaporclas);
router.put('/editasector/:id', aportantescontrollers.editaporsect);

router.delete('/:id', aportantescontrollers.delete);





module.exports = router;