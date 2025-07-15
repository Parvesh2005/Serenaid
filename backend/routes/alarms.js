const express = require('express');
const router = express.Router();

const { createAlarm, getAlarmForUser, updateAlarmStatus } = require('../controllers/alarms');

router.route('/').post(createAlarm);
router.route('/:role/:name').get(getAlarmForUser);
router.route('/:id/resolve').patch(updateAlarmStatus);

module.exports = router;