const mongoose = require('mongoose');
const request = require('supertest');
const { Statistic } = require('../../models/statistic');
const {Transaction} = require('../../models/transaction');
const {User} = require('../../models/user');
let server;

describe('/api/transactions',() => {
    beforeEach(() => {
        if (typeof  server !== 'undefined') server.close();
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await Transaction.remove({});
        await Statistic.remove({});
    });

    describe('GET /',() => {
        let token;
        let user;
        const exec = function () {
            return request(server)
                .get('/api/transactions')
                .set('x-auth-token',token);
        }
        beforeEach(() => {
            user = new User();
            token = user.generateJwtToken();
        });

        it('Should return transaction list', async () => {
            const transactions = [
                {price: 400,owner: mongoose.Types.ObjectId(user._id)},
                {price: 450,owner: mongoose.Types.ObjectId(user._id)},
            ]

            await Transaction.collection.insertMany(transactions);
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(t => t.price === 400)).toBeTruthy();
            expect(res.body.some(t => t.price === 450)).toBeTruthy();
        });
    });
    describe('GET /:typeId',()=>{
        let token;
        let typeId;
        let user;
        const exec = function (){
            return request(server)
                .get('/api/transactions/'+typeId)
                .set('x-auth-token',token);
        }
        beforeEach(()=>{
            user = new User();
            token = user.generateJwtToken();
            typeId = new mongoose.Types.ObjectId()
            
        });

        it('should return 400 if invalid type id was send',async ()=>{
            typeId = '1'
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return list of transaction with given type id.',async ()=>{
            const transactions = [
                {price: 400,owner: user._id, transactionType: typeId},
                {price: 400,owner: user._id, transactionType: new mongoose.Types.ObjectId()},
                {price: 400,owner: user._id, transactionType: typeId}
            ]
            Transaction.insertMany(transactions)
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    })
    describe('POST /',  () => {
        let token;
        let transaction;
        let user;
        const exec = function() {
            return  request(server)
                .post('/api/transactions/')
                .set('x-auth-token',token)
                .send(transaction)
        }
        beforeEach(() => {
            user = new User();
            token = user.generateJwtToken();
            transaction = {
                price: 15,
                transactionType: mongoose.Types.ObjectId().toString(),
            }
        });
        it('should return 400 when Invalid transaction was send', async ()=> {
            transaction = {transactionType: 'mkdsjfsl'}
            
            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 200 when valid object was send and should modify related statistic filed',async ()=> {
            const tr = Transaction({
                transactionType: transaction.transactionType,
                price: transaction.price,
            })
            await Statistic.insertMany([
                {type:tr.transactionType,price:100,year:tr.year,month:tr.month,user:user._id}
            ]);
            const res = await exec();
            expect(res.status).toBe(200)
            expect(res.body.price).toBe(115);
        });
        it('should return 200 and create new statistic',async ()=>{
            const res = await exec();
            expect(res.status).toBe(200)
            expect(res.body.price).toBe(15);
        });
    });
    describe('DELETE /:id',() => {
        let id;
        let transaction;
        let token;
        const exec = function () {
            return request(server)
                .delete('/api/transactions/'+id)
                .set('x-auth-token',token);
        }
        beforeEach(async () => {
            const user = new User();
            token = user.generateJwtToken();
            transaction = new Transaction({
                price: 15,
                transactionType: mongoose.Types.ObjectId().toString(),
                owner: user._id
            });
            await transaction.save();
            Statistic.insertMany([{
                user: transaction.owner,
                type: transaction.transactionType,
                year: transaction.year,
                month: transaction.month,
                price: transaction.price
            }]);
            id = transaction._id
        });

        it('should return 400 if invalid id was send',async()=>{
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400)
        });

        it('should return modified statistic when transaction was deleted.',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.price).toBe(0);
        });
    });

    // describe('GET /year',() => {
    //     let token;
    //     let user;
    //     const exec = function () {
    //         return request(server)
    //             .get('/api/transactions/year')
    //             .set('x-auth-token',token);
    //     }
    //     beforeEach(async()=>{
    //         user = new User({phone: '+989374691756'});
    //         token = user.generateJwtToken();
    //     });
    //     it('it should return result',async ()=>{
    //         const transactions = [
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'07',day:'19'},
    //             {price: 25,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'19'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'07',day:'20'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'07',day:'21'},
    //             {price: 10,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'07',day:'22'},
    //             {price: 150,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'20'},
    //             {price: 155,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'21'},
    //         ];
    //         await Transaction.collection.insertMany(transactions);
    //         const res = await exec();
    //         console.log(res.body[0]);
    //         expect(res.status).toBe(200)
    //         expect(res.body.length).toBe(1);
    //         expect(res.body.some(t=> t._id === '1401')).toBeTruthy();
    //     });
    // });
    // describe('GET /month',() => {
    //     let token;
    //     let user;
    //     transactionType: 'purchase',
    //     const exec = function () {
    //         return request(server)
    //             .get('/api/transactions/month')
    //             .set('x-auth-token',token);
    //     }
    //     beforeEach(async()=>{
    //         user = new User({phone: '+989374691756'});
    //         token = user.generateJwtToken();
    //     });
    //     it('it should return result',async ()=>{
    //         const transactions = [
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'19'},
    //             {price: 25,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'19'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'20'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'21'},
    //             {price: 10,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'22'},
    //             {price: 150,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'20'},
    //             {price: 155,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'21'},
    //         ];
    //         await Transaction.collection.insertMany(transactions);
    //         const res = await exec();
    //         expect(res.status).toBe(200)
    //         expect(res.body.length).toBe(2);
    //         expect(res.body.some(t=> t._id.month === '8')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '7')).toBeTruthy();
    //     });
    // });
    // describe('GET /day',() => {
    //     let token;
    //     let user;
    //     const exec = function () {
    //         return request(server)
    //             .get('/api/transactions/day')
    //             .set('x-auth-token',token);
    //     }
    //     beforeEach(async()=>{
    //         user = new User({phone: '+989374691756'});
    //         token = user.generateJwtToken();
    //     });
    //     it('it should return result',async ()=>{
    //         const transactions = [
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'19'},
    //             {price: 25,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'19'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'20'},
    //             {price: 15,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'21'},
    //             {price: 10,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'7',day:'22'},
    //             {price: 150,transactionType: 'credit',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'20'},
    //             {price: 155,transactionType: 'purchase',owner: mongoose.Types.ObjectId(user._id),year: '1401',month:'8',day:'20'},
    //         ];
    //         await Transaction.collection.insertMany(transactions);
    //         const res = await exec();
    //         expect(res.status).toBe(200)
    //         expect(res.body.length).toBe(6);
    //         expect(res.body.some(t=> t._id.month === '8' && t._id.day === '20')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '8' && t._id.day === '19')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '7' && t._id.day === '19')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '7' && t._id.day === '20')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '7' && t._id.day === '21')).toBeTruthy();
    //         expect(res.body.some(t=> t._id.month === '7' && t._id.day === '22')).toBeTruthy();

    //     });
    // });
});