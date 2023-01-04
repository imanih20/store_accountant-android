const mongoose = require('mongoose');
const request = require('supertest');
const { Statistic } = require('../../models/statistic');
const {User} = require('../../models/user');
let server;

describe('/api/statistics',()=>{
    beforeEach(() => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await Statistic.remove({});
    });

    describe('GET /:typeId',()=>{
        let token;
        let typeId;
        const exec = function() {
            return request(server)
                .get('/api/statistic/'+typeId)
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            const user = new User();
            token = user.generateJwtToken();
            typeId = new mongoose.Types.ObjectId();
            await Statistic.insertMany([
                {user: user._id,type: typeId,price:200,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:50,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:25,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:250,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:100,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:150,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'9'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'8'},
            ]);
        });
        it('should return 400 if invalid typeId was send.',async ()=>{
            typeId = 1;
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 200 and statistic list with given typeId.',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(5);
            expect(res.body.some(s => s.price === 200)).toBeTruthy();
        });
    });
    describe('GET /:typeId/:year/:month',()=>{
        let token;
        let typeId;
        let year;
        let month;
        const exec = function(){
            return request(server)
                .get('/api/statistic/'+typeId+'/'+year+'/'+month)
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            const user = new User();
            token = user.generateJwtToken();
            typeId = new mongoose.Types.ObjectId();
            await Statistic.insertMany([
                {user: user._id,type: typeId,price:200,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:50,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:25,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:250,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:100,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:150,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'9'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'8'},
            ]);
            year = '1401';
            month = '8'
        });
        it('should return 400 if invalid type id was send.',async ()=>{
            typeId = 1;
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return statistic with given typeId and date.',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(s=>s.price === 25)).toBeTruthy();
        });
    });
    describe('GET /:year/:month',()=>{
        let token;
        let year;
        let month;
        const exec = function(){
            return request(server)
                .get('/api/statistic/'+year+'/'+month)
                .set('x-auth-token',token);
        }
        beforeEach(async ()=>{
            const user = new User();
            token = user.generateJwtToken();
            const typeId = new mongoose.Types.ObjectId();
            await Statistic.insertMany([
                {user: user._id,type: typeId,price:200,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:50,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:25,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:250,year:'1401',month:'9'},
                {user: user._id,type: typeId,price:100,year:'1401',month:'8'},
                {user: user._id,type: typeId,price:150,year:'1401',month:'10'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'9'},
                {user: user._id,type: new mongoose.Types.ObjectId(),price:25,year:'1401',month:'8'},
            ]);
            year = '1401';
            month = '9'
        });
        it('should return statistic with given typeId and date.',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(s=>s.price === 50)).toBeTruthy();
        });
    });
});