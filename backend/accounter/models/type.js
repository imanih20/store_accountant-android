const mongoose = require('mongoose')
const Joi = require('joi')

const typeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Type = mongoose.model('Type',typeSchema);

function validateType(type){
    const schema = Joi.object({
        title: Joi.string().required(),
    });

    return schema.validate(type);
}

module.exports.Type = Type;
module.exports.validate = validateType;