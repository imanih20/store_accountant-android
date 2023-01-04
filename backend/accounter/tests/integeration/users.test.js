const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require('../../models/user');
let server;

describe('/api/users',()=>{
    
    beforeEach(async () => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await User.remove({});
    });

    describe('GET /me',()=>{
        let token;
        let user;
        beforeEach(async()=>{
            user = new User({
                // name: 'mohyeddin',
                phone: '+989374691756',
                // password: '123abcA;'
            });
            await user.save();
            token = user.generateJwtToken();
        });
        const exec = function (){
            return request(server)
                .get('/api/users/me')
                .set('x-auth-token',token);
        }
        it('should return 400 if user not found.',async ()=>{
            token = new User().generateJwtToken();
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return user properties',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('phone',user.phone);
        });
    })
});