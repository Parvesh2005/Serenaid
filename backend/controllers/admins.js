const Admin = require('../models/admin');
const asyncWrapper = require('../middleware/asyncWrapper');

const createAdmin = asyncWrapper (async (req, res) => {
    const admin = await Admin.create(req.body);
    res.status(201).json({admin});
})

module.exports = {
    createAdmin
}