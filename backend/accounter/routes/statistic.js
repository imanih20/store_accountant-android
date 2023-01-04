const express = require('express');
const statistic = require('../controller/statistic');
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/:typeId',auth,statistic.getStatisticsByType);
router.get('/:typeId/:year/:month',auth,statistic.getStatisticsByDateAndType);
router.get('/:year/:month',auth,statistic.getStatisticsByDate);

module.exports = router