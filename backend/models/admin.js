const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            required: [true, 'session only valid with mail']
        },
        hospital: {
            type: String,
            required: [true, 'must provide hospital name'],
            trim: true
        },
        department: {
            type: String,
            required: [true, 'must provide department name']
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Admin', adminSchema);