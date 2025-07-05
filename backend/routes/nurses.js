const express = require('express');

const { createNurse, getAllNurses, getNurseByEmail, getNurseById } = require('../controllers/nurses');

const router = express.Router();

router.route('/').post(createNurse).get(getAllNurses);
router.route('/:id').get(getNurseById);
router.route('/email/:email').get(getNurseByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;