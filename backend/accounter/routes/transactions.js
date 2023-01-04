const express = require('express');
const transaction = require('../controller/transaction');
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();


router.get('/',auth,transaction.getTransactions);

router.post('/',auth,transaction.addTransaction);

router.delete('/:id',[auth, validateObjectId],transaction.deleteTransaction);

router.get('/:typeId',auth,transaction.getTransactionsWithType);

// router.get('/day',auth,transaction.getDayReport);

// router.get('/month',auth,transaction.getMonthReport);

// router.get('/year',auth,transaction.getYearReport);

module.exports = router;