const {Type,validate} = require('../models/type');
const mongoose = require('mongoose');
const Joi = require('joi');

module.exports.getTypes = async (req,res)=>{
    const types = await Type.find({user: req.user._id});
    res.send(types);
}

module.exports.getType = async (req,res) => {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(400).send('Transaction type not found.');

    res.send(type);
}

module.exports.addType = async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const type = new Type({
        title: req.body.title,
        user: mongoose.Types.ObjectId(req.user._id)
    });

    await type.save()
    res.send(type)
}

module.exports.deleteType = async (req,res) => {
    const type = await Type.findByIdAndRemove(req.params.id);
    if (!type) return res.status(400).send('Transaction Type not found.');

    res.send(type)
}

module.exports.editType = async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const type = await Type.findByIdAndUpdate(req.params.id,{
        $set:{
            title: req.body.title
        },
    },{new: true});
    if (!type) return res.status(400).send('Transaction type not found.');

    res.send(type);
}