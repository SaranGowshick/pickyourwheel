const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const pickYourWheel = new mongoose.Schema({
    USER_ID: String,
    TRANS_ID: String,
    DATE: { type: String, default: () => moment().utc().format() },
    ENTRIES: [
        {
            ID: Number,
            POSITION: Number,
            TEXT: String,
        },
    ],
});

const Pickyourwheel = mongoose.model('PickYourWheel', pickYourWheel);


module.exports = Pickyourwheel;