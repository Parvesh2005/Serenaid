const express = require('express');

const { createPatient, getAllPatients,getUnapprovedPatients,
  getApprovedPatients,
  approvePatient,getPatientById, getPatientByEmail } = require('../controllers/patients');

const router = express.Router();

router.route('/').post(createPatient).get(getAllPatients);
router.route('/unapproved').get(getUnapprovedPatients);
router.route('/approved').get(getApprovedPatients);
router.route('/approve/:id').patch(approvePatient);
router.route('/:id').get(getPatientById);
router.route('/email/:email').get(getPatientByEmail);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;