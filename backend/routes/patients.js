const express = require('express');

const { createPatient, getAllPatients,getUnapprovedPatients,
  getApprovedPatients,
  approvePatient,getPatientById, getPatientByEmail, getApprovedPatientsForNurse } = require('../controllers/patients');

const router = express.Router();

router.route('/').post(createPatient).get(getAllPatients);
router.route('/unapproved').get(getUnapprovedPatients);
router.route('/approved').get(getApprovedPatients);
router.route('/approved/nurse').get(getApprovedPatientsForNurse);
router.route('/approve/:id').patch(approvePatient);
router.route('/email/:email').get(getPatientByEmail);
router.route('/:id').get(getPatientById);

// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;