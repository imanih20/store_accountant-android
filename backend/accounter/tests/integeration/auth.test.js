const request = require('supertest');
const {User} = require('../../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

let server;

describe('auth middleware',() => {
    let token;
    let user;

    beforeEach(() => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');

        user = new User();
        token = user.generateJwtToken();
    });
    afterEach(async () => {
        await server.close();
    });
    
    
    const exec = function () {
        return request(server)
            .get('/api/transactions')
            .set('x-auth-token',token);
    }

    it('should return 401 when user not authenticated',async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    
    it('should return 400 when invalid token provided',async () => {
        token = '1';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return user decoded.',async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});

describe('/api/auth',()=>{
    beforeEach(() => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await User.remove({});
    });

    describe('POST /api/auth/sign',()=>{
        let phone;
        const exec = function (){
            return request(server)
                .post('/api/auth/sign')
                .send({phone: phone});
        }
        beforeEach(()=>{
            phone = '+989374691756';
        })

        it('should return 400 if invalid request was send',async ()=>{
            phone = '';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return an object with token and isSigned value',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('token')
        })
    });

    describe('POST /auth/verify',()=>{
        let token;
        let user;
        let sms;
        const exec = function(){
            return request(server)
                .post('/api/auth/verify')
                .set('x-auth-token',token)
                .send({smsToken: sms});
        }

        beforeEach(async ()=>{
            user = new User({phone:'+989374691756'});
            await user.save();
            token = user.generateJwtToken();
            sms = '1234'
        });
        it('should return 400 if invalid sms token was send',async ()=>{
            sms = '';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it ('should return user object',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.user).toMatchObject({
                _id: user._id,
                phone: user.phone
            });
            expect(res.body).toHaveProperty('isSigned',true);
        });
        it ('should return isSigned equal to false when user not registered.',async () =>{
            user = new User({phone: '09032691756'});
            token = user.generateJwtToken();
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('isSigned',false);
        })
    });
    // describe('POST /register',()=>{
    //     let user;
    //     const exec = function(){
    //         return request(server)
    //             .post('/api/auth/register')
    //             .send(user)
    //     }
    //     beforeEach(()=>{
    //         user = {
    //             // name:'mohyeddin',
    //             phone:'+989374791756',
    //             // password:'123Abcd;'
    //         }
    //     });

    //     it('should return 400 if body is not valid.',async ()=>{
    //         user = {}
    //         const res = await exec();
    //         expect(res.status).toBe(400);
    //     });

    //     it('should return 400 if user already exist.',async ()=>{
    //         await new User(user).save();

    //         const res = await exec();

    //         expect(res.status).toBe(400);
    //     });

    //     it('should return user credentials.',async ()=>{
    //         const res = await exec();
    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty('phone',user.phone);
    //     });
    // });
    
    // describe('/api/auth/login',()=>{
    //     let user;
    //     const exec = function(){
    //         return request(server)
    //             .post('/api/auth/login')
    //             .send(_.pick(user,['phone','']));
    //     }

    //     beforeEach(async ()=>{
    //         user = {
    //             name:'mohyeddin',
    //             phone:'+989374891756',
    //             password:''
    //         }
    //         const salt = await bcrypt.genSalt(9);
    //         user.password = await bcrypt.hash('123Abcd;',salt);
    //         new User(user).save();
    //     });

    //     it('should return 400 if request body is not valid.',async ()=>{
    //         user = {
    //             phone: ''
    //             // password: ''
    //         }

    //         const res = await exec();

    //         expect(res.status).toBe(400);
    //     });

    //     it('should return 400 if user not exist.',async ()=>{
    //         user.phone = '+989374691000';
    //         // user.password = '123Abcd;';

    //         const res = await exec();

    //         expect(res.status).toBe(400);
    //     });

    //     // it('should return 400 if user exist but password is not correct.',async ()=>{
    //     //     user.password = '1324687adcA;';
    //     //     const res = await exec();
    //     //     expect(res.status).toBe(400);
    //     // });

    //     it('should return token.',async ()=>{
    //         user.password = '123Abcd;';
    //         const res = await exec();
    //         expect(res.status).toBe(200);
    //     });
    // });
});
