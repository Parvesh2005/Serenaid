const Nurse = require('../models/nurse');
const asyncWrapper = require('../middleware/asyncWrapper');

const createNurse = asyncWrapper (async (req, res) => {
    const nurse = await Nurse.create(req.body);
    res.status(201).json({ nurse });
})

const getAllNurses = asyncWrapper (async (req, res) => {
    const nurses = await Nurse.find({});
    res.status(200).json({ nurses });
})

const getNurseByEmail = asyncWrapper(async (req, res) => {
  const { email } = req.params;

  const nurse = await Nurse.findOne({ email });

  if (!Nurse) {
    return res.status(404).json({ error: 'Nurse not found' });
  }

  res.status(200).json({ nurse });
});

const getNurseById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const nurse = await Nurse.findById(id);

  if (!Nurse) {
    ;return res.status(404).json({ error: 'Nurse not found' });
  }

  res.status(200).json({ nurse });
});


const getUnapprovedNurses = asyncWrapper(async (req, res) => {
  const { hospital } = req.query;
  const filter = { approved: false };
  if (hospital) filter.hospital = hospital;
  console.log("Fetching unapproved nurses for:", filter);
  const nurses = await Nurse.find(filter);
  res.status(200).json({ nurses: nurses });
});

const getApprovedNurses = asyncWrapper(async (req, res) => {
  const { hospital } = req.query;
  const filter = { approved: true };
  if (hospital) filter.hospital = hospital;

  const nurses = await Nurse.find(filter);
  res.status(200).json({ nurses: nurses });
});

const approveNurse = asyncWrapper(async (req, res) => {
  const nurse = await Nurse.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );
  if (!nurse) return res.status(404).json({ message: "Nurse not found" });
  res.status(200).json({ message: "Nurse approved", nurse });
});

module.exports = {
  createNurse,
  getAllNurses,
  getNurseByEmail,
  getNurseById,
  getUnapprovedNurses,
  getApprovedNurses,
  approveNurse
};