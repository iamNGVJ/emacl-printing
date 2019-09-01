const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('/topup', require('./topup'));
router.use('/upload', require('./uploads'));

module.exports = router;
