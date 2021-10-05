const mongoose = require('mongoose');
const supertest = require('supertest')
const app = require("../app");
const timeline = require('../models/timeline');
const Category = require('../utils/category')
const port = process.env.TEST_PORT
const MONGO_URL = process.env.MONGO_TEST;

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

test("The result of get is to the app when there is nothing is an empty list", async () => {
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body).toStrictEqual([])
        })
});

test("The result of get is to the app after inserting 1 timeline is a list with 1 element", async () => {
    await create2Timelines()
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.length).toBe(1)
        })
});

test("When you post a timeline it returns it", async () => {
    const timelineExample = {
        title: 'Time line with 0 entries', category: Category.GEOGRAPHY, entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 2,
                ad: true
            },
            text: 'Test :)'
        }]
    }
    await api
        .post("/timeline/")
        .send(timelineExample)
        .expect(201)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.title).toBe(timelineExample.title)
            expect(res.body.category).toBe(timelineExample.category)
            expect(res.body.entries[0].title).toEqual(timelineExample.entries[0].title)
        })
});

test("When you post a timeline its stored in the database", async () => {
    const timelineExample = {
        title: 'Time line with 1 entries', category: Category.GEOGRAPHY, entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 2,
                ad: true
            },
            text: 'Test :)'
        },]
    }
    await api
        .post("/timeline/")
        .send(timelineExample).then(res => { })
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body[0].title).toBe(timelineExample.title)
            expect(res.body[0].category).toBe(timelineExample.category)
            expect(res.body[0].entries[0].title).toStrictEqual(timelineExample.entries[0].title)
        })
});

test("When you put a timeline its updated in the database", async () => {
    const timelineExample = {
        title: 'Time line with 1 entries', subtitle: 'there will be a new entry', category: Category.GEOGRAPHY, entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 2,
            },
            text: 'Test :)'
        },]
    }
    const newEntry = { title: "title of the entry", date: { year: 2001, month: 1, day: 2, ad: true }, text: "This is a new entry" }
    const timelineExampleUpdated = { title: 'Time line with 0 entries', subtitle: 'there is a new entry', category: Category.GEOGRAPHY, entries: [newEntry] }
    const id = await api
        .post("/timeline/")
        .send(timelineExample).then(res => {
            return res.body._id
        })
    await api
        .put("/timeline/" + id)
        .send(timelineExampleUpdated)
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.title).toBe(timelineExampleUpdated.title)
            expect(res.body.subtitle).toBe(timelineExampleUpdated.subtitle)
            expect(res.body.category).toBe(timelineExampleUpdated.category)
            expect(res.body.entries[0].title).toStrictEqual(timelineExampleUpdated.entries[0].title)
            expect(res.body.entries[0].text).toStrictEqual(timelineExampleUpdated.entries[0].text)
            expect(res.body.entries[0].date.year).toStrictEqual(timelineExampleUpdated.entries[0].date.year)
            expect(res.body.entries[0].date.month).toStrictEqual(timelineExampleUpdated.entries[0].date.month)
            expect(res.body.entries[0].date.day).toStrictEqual(timelineExampleUpdated.entries[0].date.day)
            expect(res.body.entries[0].date.ad).toStrictEqual(timelineExampleUpdated.entries[0].date.ad)

        })
});

beforeAll(async () => {
    server = connect()
    await timeline.deleteMany({})
})


beforeEach(async () => {
    await timeline.deleteMany({})
})

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})
async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()
}

function create2Timelines() {
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

function connect() {
    mongoose.connect(MONGO_URL).then((res) => {
    }).catch();
    return app.listen(port)
}