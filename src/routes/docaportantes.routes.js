

const express = require('express');
const router = express.Router();

const {documents} = require('../middlewares/index');
const docaportantescontrollers= require('../controllers/docaportantescontrollers');

router.get('/descargaruno/:id', docaportantescontrollers.downloaduno);
router.get('/downloadenla/:id', docaportantescontrollers.downloadenla);
router.get('/downloadtran/:id', docaportantescontrollers.downloadtran);
router.get('/downloadfaca/:id', docaportantescontrollers.downloadfaca);

router.get('/descargardos', docaportantescontrollers.downloaddos);

router.post('/subiruno', documents.storagesingle, docaportantescontrollers.uploaduno);
router.post('/subirfac', documents.storagesingle, docaportantescontrollers.uploadfact);
router.post('/subirenla', documents.storagesingle, docaportantescontrollers.uploadenla);
router.post('/subirtran', documents.storagesingle, docaportantescontrollers.uploadtran);

router.get('/', docaportantescontrollers.listcat)
router.get('/transiciones/:id', docaportantescontrollers.transiciones);
router.get('/transicionesdocs/:id', docaportantescontrollers.transicionesdocs);
router.get('/factoresdocs/:id', docaportantescontrollers.factoresdocs);

router.get('/:id', docaportantescontrollers.docapoid)

router.get('/aportante/:id', docaportantescontrollers.listcatbyaportante) ;

router.delete('/:id', docaportantescontrollers.delete);


module.exports = router;