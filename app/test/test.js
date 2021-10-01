const mongoose = require('mongoose');
const supertest = require('supertest')
const app = require("../app");
const server = require("../index")

const api = supertest(app)

test("Should be 404", async () => {
    await api
        .get("/random")
        .expect(404)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.status).toBe(404)
            expect(res.body.errorCode).toBe('RESOURCE_NOT_FOUND')
        })
});
/*
test("Should be 200", async () => {
    const response = await api
        .get("/timeline/")
    expect(response.body).toBe([])
});
*/
afterAll(()=>{
    mongoose.connection.close()
    server.close()
})