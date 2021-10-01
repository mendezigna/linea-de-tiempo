const mongoose = require('mongoose');
const supertest = require('supertest')
const app = require("../app");
const timeline = require('../models/timeline');
const Category = require('../utils/category')
const port = process.env.PORT
const MONGO_URL = process.env.MONGO;

const api = supertest(app)

var server;
test("Should be 404", async () => {
    await api
        .get("/randomUrl")
        .expect(404)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.status).toBe(404)
            expect(res.body.errorCode).toBe('RESOURCE_NOT_FOUND')
        })
});

test("TODO GOOD NAMES 1", async () => {
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body).toStrictEqual([])
        })
});

test("TODO GOOD NAMES 2", async () => {
    create2Timelines()
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.length).toBe(1)
        })
});

test("TODO GOOD NAMES 3", async () => {
    const timelineExample = {title: 'Time line with 0 entries', category: Category.GEOGRAPHY, entries: []}
    await api
        .post("/timeline/")
        .send(timelineExample)
        .expect(201)
        .expect('Content-type', /json/).then(res => {
            expect(res.body).toBe(timelineExample)
        })
});

beforeAll(async ()=>{
    server = connect()
    await timeline.deleteMany({})
})

/*
beforeEach(async () =>{
})*/

afterAll(async ()=>{
    await mongoose.disconnect()
    server.close()
})
/*--detectOpenHandles */
async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()
}

function create2Timelines(){
    createTimeline({
        title: 'Time line with 2 entries',
        category: Category.GEOGRAPHY,
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 2
            },
            text: 'Test :)'
        },
        {
            title: 'Entry 2',
            date: { 
                year: 1999, 
                month: 1, 
                day: 1 
            },
            text: 'Test :O'

        }]
    })
}

function connect(){
    mongoose.connect(MONGO_URL).then((res) => {
        console.log('Connected');
    }).catch(console.log);
    return app.listen(port)
}
