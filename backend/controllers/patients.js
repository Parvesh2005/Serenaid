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

const getUnapprovedPatients = asyncWrapper(async (req, res) => {
  const { department, building } = req.query;

  const filter = { approved: false };
  if (department) filter.department = department;
  if (building) filter.building = building;
  
  // const unapprovedPatients = await Patient.find(filter);

  // if (!unapprovedPatients || unapprovedPatients.length === 0) {
  //   return res.status(404).json({ patients: [] });
  // }

  const patients = await Patient.find(filter);

  res.status(200).json({ patients });
  // res.status(200).json({ patients: unapprovedPatients });
});

const getApprovedPatients = asyncWrapper(async (req, res) => {
  const { department, building } = req.query;

  const filter = { approved: true };
  if (department) filter.department = department;
  if (building) filter.building = building;

  const approvedPatients = await Patient.find(filter);

  if (!approvedPatients || approvedPatients.length === 0) {
    return res.status(404).json({ patients: [] });
  }

  res.status(200).json({ patients: approvedPatients });
});

const approvePatient = asyncWrapper(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.status(200).json({ message: "Patient approved", patient });
});

module.exports = {
    createPatient,
    getAllPatients,
    getPatientByEmail,
    getPatientById,
    getUnapprovedPatients,
    getApprovedPatients,
    approvePatient

}