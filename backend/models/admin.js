const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema (
    {
        email: {
            type: String,
            required: [true, 'session only valid with mail']
        },
        name: {
            type: String,
            required: [true, 'must provide name']
        },
        hospital: {
            type: String,
            required: [true, 'must provide hospital name'],
            trim: true
        },
        contact: {
            type: String,
            required: [true, 'Must provide phone number'],
            trim: true,
            maxlength: [10, 'Phone number cannot exceed 10 digits'],
            minlength: [10, 'Phone number must be 10 digits'],
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },
        department: {
            type: String,
            required: [true, 'must provide department name']
        },
        completed: {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Admin', adminSchema);