const express = require('express');

const { createAdmin } = require('../controllers/admins');

const router = express.Router();

router.route('/').post(createAdmin);

module.exports = router;