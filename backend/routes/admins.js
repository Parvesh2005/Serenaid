const express = require('express');

const { createAdmin, getAllAdmins, getAdminByEmail, getAdminById } = require('../controllers/admins');

const router = express.Router();

router.route('/').post(createAdmin).get(getAllAdmins);
router.route('/:id').get(getAdminById);
router.route('/email/:email').get(getAdminByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;