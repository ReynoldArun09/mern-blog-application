import { app } from "../app";
import request from 'supertest'


describe('Test Register user route', () => {
    test('it should return 400 if the email is not valid', async() => {
        await request(app).post('/api/v1/user/register-user').send({})
        .expect(400)
    })
})
