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

module.exports = {
    createNurse,
    getAllNurses,
    getNurseByEmail,
    getNurseById
}