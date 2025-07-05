const Admin = require('../models/admin');
const asyncWrapper = require('../middleware/asyncWrapper');
const admin = require('../models/admin');

const createAdmin = asyncWrapper (async (req, res) => {
    const admin = await Admin.create(req.body);
    res.status(201).json({ admin });
})

const getAllAdmins = asyncWrapper (async (req, res) => {
    const admins = await Admin.find({});
    res.status(200).json({ admins });
})

const getAdminByEmail = asyncWrapper(async (req, res) => {
  const { email } = req.params;

  const admin = await Admin.findOne({ email });

  if (!Admin) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  res.status(200).json({ admin });
});

const getAdminById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (!Admin) {
    ;return res.status(404).json({ error: 'Nurse not found' });
  }

  res.status(200).json({ admin });
});

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminByEmail,
    getAdminById
}