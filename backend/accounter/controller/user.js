const {User,validate} = require('../models/user');
const sms = require('../utils/sms');
const bcrypt = require('bcrypt');
const _  = require('lodash');
const Joi = require('joi');
const customJoi = Joi.extend(require('joi-phone-number'));
const passwordComplexity = require('joi-password-complexity');

module.exports.getUser = async (req,res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('user not found.');

    res.send(user);
};

// module.exports.register = async (req,res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({phone: req.body.phone});
//     if (user) return res.status(400).send('User already exits');

//     user = new User(_.pick(req.body,['name','phone','email','password']));
//     const salt = await bcrypt.genSalt(9);
//     user.password = await bcrypt.hash(req.body.password,salt);
//     console.log();
//     await user.save();
//     const token = user.generateJwtToken();
//     res.header('x-auth-token',token).send(_.pick(user,['name','phone','email']));
// };

// module.exports.login = async (req,res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findOne({phone: req.body.phone});
//     if (!user) return res.status(400).send('Invalid phone or password');
//     const validPassword = await bcrypt.compare(req.body.password,user.password);
//     console.log(validPassword);
//     if (!validPassword) return res.status(400).send('Invalid phone or password');

//     const token = user.generateJwtToken();

//     res.send(token);
// };

module.exports.signWithPhone = async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    sms(req.body.phone);

    let user = await User.findOne({phone: req.body.phone});
    if (!user){
        user = new User({
            phone: req.body.phone
        });
        await user.save();
    } 

    const token = user.generateJwtToken();

    res.send({
        token: token
    });
}
module.exports.verifyPhone = async (req,res) => {
    if (req.body.smsToken !== "1234"){
        return res.status(400).send('sms token is not valid.')
    }
    let isSigned = true;
    let user = await User.findOne({phone: req.user.phone});
    if (!user){
        isSigned = false;
        user = new User({
            _id: req.user._id,
            phone: req.user.phone
        });
        await user.save();
    }
    res.send({
        isSigned: isSigned,
        user: user
    })
}
// function validateLoginUser(req){
//     const complexityOptions = {
//         min: 8,
//         max: 26,
//         lowerCase: 1,
//         upperCase: 1,
//         numeric: 1,
//         symbol: 1,
//         requirementCount: 2,
//       };
//     const schema = Joi.object({
//         phone: customJoi.string().phoneNumber({defaultCountry: 'IR', format: 'national'}).required(),
//         password: passwordComplexity(complexityOptions).required()
//     });

//     return schema.validate(req);

// }
// function validatePhone(req){
//     const schema = Joi.object({
//         phone: customJoi.string().phoneNumber({defaultCountry: 'IR', format: 'national'}).required(),
//     });

//     return schema.validate(req);

// }
