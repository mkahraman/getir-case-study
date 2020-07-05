const request = require('supertest')
const app = require('../app');
const mongo = require('../models/index');

beforeAll(() => { // beforeEach
    // mongo.connect();
});
afterAll(done => { // afterEach
    mongo.disconnect(done);
});

describe('Faulty Test', () => {
    test('Incorrect operation Message (404)', async (done) => {
        let response = await request(app)
            .get('/');
            
            expect(response.statusCode).toEqual(404);
            expect(true).toBe(true);
            done();
    });
    test('The result is unsuccessful', async (done) => {
        let response = await request(app)
            .get('/listRecords');
            expect(response.statusCode).toEqual(404);
            expect(true).toBe(true);
            done();
    });
    test('Sending parameters missing', async (done) => {
        let response = await request(app)
            .post('/listRecords');
            expect(response.statusCode).toEqual(500);
            expect(response.body.code).toBe(50);
            done();
    });
});

describe('Correct request testing', () => {
    test('Result: Successful', async (done) => {
        let response = await request(app)
            .post('/listRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 3000
              })
            expect(response.statusCode).toEqual(200);
            expect(response.body.msg).toBe('Success');
            done();
    });
    test('Result: Successful', async (done) => {
        let response = await request(app)
            .post('/listRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '-02-02',
                minCount: 2700,
                maxCount: 3000
              })
            expect(response.statusCode).toEqual(200);
            expect(response.body.msg).toBe('Success');
            done();
    });
});