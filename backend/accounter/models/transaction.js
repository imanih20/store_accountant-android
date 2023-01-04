const mongoose = require('mongoose')
const Joi = require('joi');
const moment = require('jalali-moment');


const transactionSchema = new mongoose.Schema({
    price: {
        type: Number,
        min: 0,
        required: true
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
    day: {
        type: String,
        required: true,
        default: moment().locale('fa').format('DD')
    },
    transactionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String
});

const Transaction = mongoose.model('Transaction',transactionSchema);

function validateTransaction(transaction){
    const schema = Joi.object({
        price: Joi.number().min(0).required(),
        year: Joi.string(),
        month: Joi.string(),
        day: Joi.string(),
        transactionType: Joi.objectId().required(),
        description: Joi.string(),
    });

    return schema.validate(transaction);
}
module.exports.Transaction = Transaction;
module.exports.validate = validateTransaction;