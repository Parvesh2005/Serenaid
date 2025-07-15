const Alarm = require('../models/alarm');
const asyncWrapper = require('../middleware/asyncWrapper');

const createAlarm = asyncWrapper (async (req, res) => {
    const alarm = await Alarm.create(req.body);
    res.status(201).json({ alarm });
})

const getAlarmForUser = asyncWrapper (async (req, res) => {
    const { role, name } = req.params;

    let filter = {};

    if (role === 'doctor') {
      filter = {
        type: 'emergency',
        doctor: name,
      };
    } else if (role === 'nurse') {
      filter = {
        $or: [
          { type: 'emergency', nurse: name },
          { type: 'nurse_call', nurse: name },
        ],
      };
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const alarms = await Alarm.find(filter);
    res.status(200).json({ success: true, data: alarms });
})

const updateAlarmStatus = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updated = await Alarm.findByIdAndUpdate(
    id,
    { status: 'resolved' },
    { new: true }
  );
  if (!updated) return res.status(404).json({ success: false, message: 'Alarm not found' });
  res.status(200).json({ success: true, data: updated });
});

module.exports = {
    createAlarm,
    getAlarmForUser,
    updateAlarmStatus
}