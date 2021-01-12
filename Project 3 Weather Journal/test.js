const app = require('./server.js')
const supertest = require('supertest')
const request = supertest(app)
describe('test get route', () => {
    it('/get_route', async done => {
        const response = await request.get('/all')
        expect(response.status).toBe(200)
        done()
    })
})