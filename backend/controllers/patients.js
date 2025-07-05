const Patient = require('../models/patient');
const asyncWrapper = require('../middleware/asyncWrapper');

const createPatient = asyncWrapper (async (req, res) => {
    const patient = await Patient.create(req.body);
    res.status(201).json({ patient });
})

const getAllPatients = asyncWrapper (async (req, res) => {
    const patients = await Patient.find({});
    res.status(200).json({ patients });
})

const getPatientByEmail = asyncWrapper(async (req, res) => {
  const { email } = req.params;

  const patient = await Patient.findOne({ email });

  if (!Patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  res.status(200).json({ patient });
});

const getPatientById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findById(id);

  if (!Patient) {
    ;return res.status(404).json({ error: 'Patient not found' });
  }

  res.status(200).json({ patient });
});

module.exports = {
    createPatient,
    getAllPatients,
    getPatientByEmail,
    getPatientById
}