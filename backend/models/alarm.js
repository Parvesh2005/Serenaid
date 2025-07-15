const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema(
    {
        patient: {
            type: String,
            required: [true, 'give patient name']
        },
        type: {
            type: String,
            required: [true, 'please provide alarm type'],
            enum: ['emergency', 'nurse_call']
        },
        nurse: {
            type: String,
            required: [true, 'please provide nurse name']
        },
        doctor: {
            type: String,
            required: [true, 'please provide doctor name']
        },
        status: {
            type: String,
            enum: ['pending', 'resolved'],
            deafult: 'pending'
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Alarm', alarmSchema);