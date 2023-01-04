const {Statistic} = require('../models/statistic');
const mongoose = require('mongoose');

module.exports.getStatisticsByType = async (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.typeId))
        return res.status(400).send('Invalid type id.');

    const statistics = await Statistic.find({
        user: mongoose.Types.ObjectId(req.user._id),
        type: mongoose.Types.ObjectId(req.params.typeId)
    });

    res.send(statistics);
}

module.exports.getStatisticsByDate = async (req,res) => {

    const statistics = await Statistic.find({
        user: mongoose.Types.ObjectId(req.user._id),
        year: req.params.year,
        month: req.params.month
    });

    res.send(statistics);
}

module.exports.getStatisticsByDateAndType = async (req,res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.typeId))
        return res.status(400).send('Invalid type id.');

    const statistics = await Statistic.find({
        user: mongoose.Types.ObjectId(req.user._id),
        year: req.params.year,
        month: req.params.month,
        type: mongoose.Types.ObjectId(req.params.typeId)
    });

    res.send(statistics);
}