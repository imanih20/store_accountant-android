const mongoose = require('mongoose');
const Joi = require('joi');
const customJoi = Joi.extend(require('joi-phone-number'));
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     minlength: 5,
    //     maxlength: 50,
    //     required: true,
    // },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 20,
        unique: true,
        required: true
    },
    // email: {
    //     type: String,
    //     minlength: 5,
    //     maxlength: 255,
    // },
    // password: {
    //     type: String,
    //     minlength: 8,
    //     maxlength: 1024,
    //     required: true
    // }
});

userSchema.methods.generateJwtToken = function() {
    const token = jwt.sign({
        _id: this._id,
        phone: this.phone
    },config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);


function validateUser(user){
    // const complexityOptions = {
    //     min: 8,
    //     max: 26,
    //     lowerCase: 1,
    //     upperCase: 1,
    //     numeric: 1,
    //     symbol: 1,
    //     requirementCount: 2,
    //   };
    const schema = Joi.object({
        // name: customJoi.string().min(5).max(50).required(),
        phone: customJoi.string().phoneNumber({defaultCountry: 'IR', format: 'national'}).required(),
        // email: customJoi.string().email(),
        // password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(user);
}
module.exports.User = User,
module.exports.validate =  validateUser;