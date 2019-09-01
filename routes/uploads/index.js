const express = require('express');
const router = express.Router();

router.use('/', require('./files'));

module.exports = router;
