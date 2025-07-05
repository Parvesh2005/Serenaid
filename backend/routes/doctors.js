const express = require('express');

const { createDoctor, getAllDoctors, getDoctorByEmail, getDoctorById } = require('../controllers/doctors');

const router = express.Router();

router.route('/').post(createDoctor).get(getAllDoctors);
router.route('/:id').get(getDoctorById);
router.route('/email/:email').get(getDoctorByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;