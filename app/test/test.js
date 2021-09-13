const supertest = require('supertest')
const app = require("../app");

test("Deberia ser 404", async () => {
    await supertest(app).get("/random")
        .expect(404).expect('Content-type', /json/).then(res => {
            expect(res.body.status).toBe(404)
            expect(res.body.errorCode).toBe('RESOURCE_NOT_FOUND')

        })
});
