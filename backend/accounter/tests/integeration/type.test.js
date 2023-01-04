const mongoose = require('mongoose');
const {Type } = require('../../models/type');
const request = require('supertest');
const {User} = require('../../models/user');

let server;
describe('/api/type',()=>{
    beforeEach(() => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await Type.remove({});
    });
    describe('GET /',()=>{
        let token;
        let user;
        const exec = function () {
            return request(server)
                .get('/api/type/')
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            user = new User();
            token = user.generateJwtToken();
            await Type.insertMany([
                {title: 'benefits',user:user._id},
                {title: 'sales',user:user._id},
                {title: 'purchases',user:user._id},
                {title: 'expenses',user:new mongoose.Types.ObjectId()},
            ]);
        });
        it('should return all user\'s types.',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(t=>t.title=='benefits')).toBeTruthy();
        });
    });
    describe('GET /:id',()=>{
        let id;
        let token;
        let user;
        const exec = function(){
            return request(server)
                .get('/api/type/'+id)
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            user = new User();
            token = user.generateJwtToken();
            const type =  new Type({
                title: 'test',
                user: user._id
            });
            await type.save();
            id = type._id;
        });
        it('should return 400 if invalid id was send.',async()=>{
            id = 2;
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if type not exist',async()=>{
            id = new mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return type',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title','test')
        });
    });
    describe('POST /',()=>{
        let token;
        let type;
        const exec = function(){
            return request(server)
                .post('/api/type/')
                .set('x-auth-token',token)
                .send(type);
        }
        beforeEach(()=>{
            token = new User().generateJwtToken();
            type = {title: 'benefits'};
        });
        it('should return 400 if invalid request body was invalid.',async ()=>{
            type = {test:'kdjfslfj'};
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 200 if request body was valid',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title','benefits');
        });
    });
    describe('PUT /:id',()=>{
        let token;
        let id;
        let type;
        const exec = function(){
            return request(server)
                .put('/api/type/'+id)
                .set('x-auth-token',token)
                .send(type);
        }
        beforeEach(async ()=>{
            const user = new User();
            token = user.generateJwtToken();
            const oldType = new Type({
                title: 'expenses',
                user: user._id
            });
            await oldType.save();

            id = oldType._id;

            type = {title:'benefits'};
        });
        it('should return 400 if request body was invalid.',async ()=>{
            type =  {test:'test'};
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if type not exist',async ()=>{
            id = new mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return type if id and request body was valid.',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title','benefits');
        });
    });
    describe('DELETE /:id',()=>{
        let token;
        let id;
        const exec = function(){
            return request(server)
                .delete('/api/type/'+id)
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            const user = new User();
            token = user.generateJwtToken();
            const type = new Type({
                title:'expenses',
                user:user._id
            });
            await type.save();
            id = type._id;
        });

        it('should return 400 if type not exist.',async ()=>{
            id = new mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return deleted type.',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title','expenses');
        });
    })
});
