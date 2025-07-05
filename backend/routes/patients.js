const express = require('express');

const { createPatient, getAllPatients, getPatientById, getPatientByEmail } = require('../controllers/patients');

const router = express.Router();

router.route('/').post(createPatient).get(getAllPatients);
router.route('/:id').get(getPatientById);
router.route('/email/:email').get(getPatientByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;