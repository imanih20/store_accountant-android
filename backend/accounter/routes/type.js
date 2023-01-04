const express = require('express');
const type = require('../controller/type');
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/',auth,type.getTypes);
router.get('/:id',[auth,validateObjectId],type.getType);
router.post('/',auth,type.addType)
router.put('/:id',[auth,validateObjectId],type.editType);
router.delete('/:id',[auth,validateObjectId],type.deleteType);

module.exports = router