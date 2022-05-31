const express = require('express');
const router = express.Router();
const clasificascontroller= require('../controllers/logscontroller');

router.get('/', clasificascontroller.listlogs);
router.get('/:id', clasificascontroller.listlogsent);
router.post('/', clasificascontroller.createlogs);
module.exports = router;