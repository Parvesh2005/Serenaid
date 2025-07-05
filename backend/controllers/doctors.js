const Doctor = require('../models/doctor');
const asyncWrapper = require('../middleware/asyncWrapper');

const createDoctor = asyncWrapper (async (req, res) => {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({doctor});
})

const getAllDoctors = asyncWrapper(async (req, res) => {
  const doctors = await Doctor.find({});
  res.status(200).json({ doctors });
});

const getDoctorByEmail = asyncWrapper(async (req, res) => {
  const { email } = req.params;

  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  res.status(200).json({ doctor });
});

const getDoctorById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findById(id);

  if (!Doctor) {
    ;return res.status(404).json({ error: 'Nurse not found' });
  }

  res.status(200).json({ doctor });
});

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorByEmail,
    getDoctorById
};