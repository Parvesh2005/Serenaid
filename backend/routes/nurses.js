const express = require('express');

const { createNurse, getAllNurses, getNurseByEmail, getNurseById,getUnapprovedNurses,getApprovedNurses,approveNurse } = require('../controllers/nurses');

const router = express.Router();

router.route('/').post(createNurse).get(getAllNurses);
router.route('/email/:email').get(getNurseByEmail);
router.route('/unapproved').get(getUnapprovedNurses);
router.route('/approved').get(getApprovedNurses);
router.route('/approve/:id').patch(approveNurse);
router.route('/:id').get(getNurseById);
// encoding needed for @ -> %40, function is eg const email = encodeURIComponent("abc@xyz.com");

module.exports = router;