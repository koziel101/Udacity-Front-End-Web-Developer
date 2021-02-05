// Test the express server
import request from 'supertest';
import '@babel/polyfill';
import app from '../src/server/app';

describe('api', () => {
    describe('get /test', () => {
        it('should return a 200', () => {
            request(app).get('/test').then((res) => {
                expect(res.statusCode).toBe(200);
            });
        });
    });
});