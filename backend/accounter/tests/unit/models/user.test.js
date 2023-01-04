const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

describe('user.generateJwtToken',() => {
    it('should return valid jwt',() => {
        const payload = {_id: mongoose.Types.ObjectId()};
        const user = new User(payload);
        const token = user.generateJwtToken();
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});