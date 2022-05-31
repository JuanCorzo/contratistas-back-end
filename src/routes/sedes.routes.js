const express = require('express');
const router = express.Router();
const sedescontrollers= require('../controllers/sedescontrollers');


router.get('/', sedescontrollers.listcat);

router.get('/:id', sedescontrollers.geticatbyid) ;

router.get('/ciudad/:id', sedescontrollers.geticatbyidciu);
router.get('/departamento/:id', sedescontrollers.geticatbydep);
router.get('/territorial/:id', sedescontrollers.geticatbyterr );
router.get('/pais/:id', sedescontrollers.geticatbypa);

router.post('/', sedescontrollers.createcat);

router.put('/:id', sedescontrollers.editcat);

router.delete('/:id', sedescontrollers.deletesede);





module.exports = router;