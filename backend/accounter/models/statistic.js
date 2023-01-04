const mongoose = require('mongoose')
const Joi = require('joi')
const moment = require('jalali-moment')

const statisticSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    year: {
        type: String,
        required: true,
        default: moment().locale('fa').format('YYYY')
    },
    month: {
        type: String,
        required: true,
        default: moment().locale('fa').format('MM')
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    price: {
        type: Number,
        default: 0
    }
});

const Statistic = mongoose.model('Statistic',statisticSchema);

module.exports.Statistic = Statistic;
