const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            required: [true, 'session only valid with mail']
        },
        name: {
            type: String,
            required: [true, 'must provide name']
        },
        contact: {
            type: String,
            required: [true, 'must provide phone number'],
            trim: true,
            maxlength: [10, 'Phone number cannot exceed 10 digits'],
            minlength: [10, 'Phone number must be 10 digits'],
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },
        hospital: {
            type: String,
            required: [true, 'must provide hospital name'],
            trim: true
        },
        department: {
            type: String,
            required: [true, 'must provide department name']
        },
        building: {
            type: String,
            required: [true, 'must provide building name']
        },
        ward: {
            type: String,
            required: [true, 'must provide floor']
        },
        present: {
            type: Boolean,
            default: false
        },
        completed: {
            type: Boolean,
            default: false
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Nurse', nurseSchema);