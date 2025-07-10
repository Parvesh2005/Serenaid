const express = require('express');

const { createDoctor, getAllDoctors, getDoctorByEmail, getDoctorById, getUnapprovedDoctors, approveDoctor, getApprovedDoctors } = require('../controllers/doctors');

const router = express.Router();

router.route('/').post(createDoctor).get(getAllDoctors);
router.route('/unapproved').get(getUnapprovedDoctors);
router.route('/approved').get(getApprovedDoctors);
router.route('/:id').get(getDoctorById);
router.route('/approve/:id').patch(approveDoctor);
router.route('/email/:email').get(getDoctorByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;