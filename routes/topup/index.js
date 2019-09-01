const express = require('express');
var router = express.Router();

router.use('/topup', require('./wallet'));

module.exports = router;
