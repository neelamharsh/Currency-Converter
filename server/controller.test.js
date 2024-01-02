const request = require('supertest');
const express = require('express');
const router = require('./controller.js'); 

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /getAllCurrencyList', () => {
    test('should return currency list', async () => {
        const response = await request(app).post('/getAllCurrencyList');
        expect(response.status).toBe(200);
        expect(response.body.resCode).toBe(200);
        expect(response.body.data).toBeDefined();
    });
});

describe('POST /convert', () => {
    test('should return converted currency value', async () => {
        const requestBody = { c: 'BTC', tc: 'USD' };
        const response = await request(app)
            .post('/convert')
            .send(requestBody)
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(200);
        expect(response.body.resCode).toBe(200);
        expect(response.body.value).toBeDefined();
    });
});