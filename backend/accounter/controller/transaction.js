const {Transaction,validate} = require('../models/transaction');
const {Statistic} = require('../models/statistic')
const mongoose = require('mongoose');

// get all user transactions
module.exports.getTransactions = async (req,res) => {
    const transactions = await Transaction.find({owner: req.user._id})
    res.send(transactions);
}

// get specific type
module.exports.getTransactionsWithType = async (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.typeId))
        return res.status(400).send('Invalid type id.');
    const transactions = await Transaction.find({owner: mongoose.Types.ObjectId(req.user._id), transactionType: mongoose.Types.ObjectId(req.params.typeId)});
    res.send(transactions);
}

//add a new transaction
module.exports.addTransaction = async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const transaction = new Transaction({
        price: req.body.price,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        transactionType: mongoose.Types.ObjectId(req.body.transactionType),
        owner: mongoose.Types.ObjectId(req.user._id),
        description: req.body.description
    });
   
    await transaction.save();

    let statistic = await Statistic.findOne({
        user: mongoose.Types.ObjectId(req.user._id),
        type: mongoose.Types.ObjectId(req.body.transactionType),
        year: transaction.year,
        month: transaction.month
    });
    if (!statistic) {
        statistic = new Statistic({
            user: mongoose.Types.ObjectId(req.user._id),
            type: mongoose.Types.ObjectId(req.body.transactionType),
            year: transaction.year,
            month: transaction.month,
            price: transaction.price
        });
        await statistic.save();
    }else{
        statistic.price += transaction.price;
        await statistic.save();
    }
    res.send(statistic);
};

//delete a transaction with a given id
module.exports.deleteTransaction = async (req,res) => {
    const transaction = await Transaction.findByIdAndRemove(req.params.id);
    if (!transaction) return  res.status(400).send('transaction not found.');

    const statistic = await Statistic.findOne({
        user: mongoose.Types.ObjectId(req.user._id),
        type: mongoose.Types.ObjectId(transaction.transactionType),
        year: transaction.year,
        month: transaction.month
    }); 

    if(statistic) {
        statistic.price -= transaction.price
        await statistic.save();
    }
    res.send(statistic);
};

// module.exports.getYearReport = async (req,res) => {
//     const yearReport = await Transaction.aggregate(
//         [
//             {$match: {owner: mongoose.Types.ObjectId(req.user._id)}},
//             {$group: {
//                 _id: {
//                     year: '$year',
//                     type: '$transactionType'
//                 },
//                 amount: {
//                     $sum: '$price'
//                 }
//             }},
//             {$group: {
//                 _id: '$_id.year',
//                 amounts: {
//                     $push: {
//                         type: '$_id.type',
//                         amount: '$amount'
//                     }
//                 }
//             }

//             }
//         ]
//     );
//     res.send(yearReport)
// }

// module.exports.getDayReport = async (req,res) =>{
//     const dayReport = await Transaction.aggregate(
//         [
//             {$match: {owner: mongoose.Types.ObjectId(req.user._id)}},
//             {$group: {
//                 _id: {
//                     year: '$year',
//                     month: '$month',
//                     day: '$day',
//                     type: '$transactionType'
//                 },
//                 amount: {
//                     $sum: '$price'
//                 }
//             }},
//             {$group:{
//                 _id: {
//                     year: '$_id.year',
//                     month: '$_id.month',
//                     day: '$_id.day'
//                 },
//                 amounts: {
//                     $push: {
//                         type: '$_id.type',
//                         amount: '$_id.amount'
//                     }
//                 }
//             }}
//         ]
//     );
//     res.send(dayReport)
// }

// module.exports.getMonthReport = async (req,res) => {
//     const monthReport = await Transaction.aggregate(
//         [
//             {$match: {owner: mongoose.Types.ObjectId(req.user._id)}},
//             {$group: {
//                 _id: {
//                     year: '$year',
//                     month: '$month',
//                     type: '$transactionType'
//                 },
//                 amount: {
//                     $sum: '$price'
//                 }
//             }},
//             {$group:{
//                 _id: {
//                     year: '$_id.year',
//                     month: '$_id.month',
//                 },
//                 amounts: {
//                     $push: {
//                         type: '$_id.type',
//                         amount: '$_id.amount'
//                     }
//                 }
//             }}
//         ]
//     );
//     res.send(monthReport);
// }