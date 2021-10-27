const mongoose = require('mongoose');
const request = require('superagent');
const supertest = require('supertest');
const app = require("../app");
const timeline = require('../models/timeline');
const user = require('../models/user')
const Category = require('../utils/category')
const port = process.env.TEST_PORT
const MONGO_URL = process.env.MONGO_TEST;
const api = supertest(app)

var server;
var token;

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

test("Get All timelines", async () => {
    await createATimelineWith2Entries()
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
                ce: true
            },
            text: 'Test :)'
        }]
    }
    await api
        .post("/timeline/").set('Authorization', token)
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
                ce: true
            },
            text: 'Test :)'
        },]
    }
    await api
        .post("/timeline/").set('Authorization', token)
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
    const newEntry = { title: "title of the entry", date: { year: 2001, month: 1, day: 2, ce: true }, text: "This is a new entry" }
    const timelineExampleUpdated = { title: 'Time line with 0 entries', subtitle: 'there is a new entry', category: Category.GEOGRAPHY, entries: [newEntry] }
    const id = await api
        .post("/timeline/").set('Authorization', token)
        .send(timelineExample).then(res => {
            return res.body._id
        })
    await api
        .put("/timeline/" + id).set('Authorization', token)
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
            expect(res.body.entries[0].date.ce).toStrictEqual(timelineExampleUpdated.entries[0].date.ce)
        })
});

test("If you try to get a timeline to edit without the token it fails", async () =>{
    const timelineExample = {
        title: 'Time line with 0 entries', category: Category.GEOGRAPHY, entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 2,
                ce: true
            },
            text: 'Test :)'
        }]
    }
    await api
        .post("/timeline/")
        .send(timelineExample)
        .expect(401)
        .expect('Unauthorized')

})

test("login fails if", async () =>{ 
    const loginInfoFail = {email: "test@test.com", password: "admin1"}
    await api
        .post("/user/login")
        .send(loginInfoFail)
        .expect(400)
})

test("login succed", async () =>{
    const loginInfoSucced = {email: "test@test.com", password: "abcde12345"}
    await api
        .post("/user/login")
        .send(loginInfoSucced)
        .expect(200)
})
test("register fails", async () =>{
    const registerInfoFail = { name: "test", password: "abcde12345" }
    await api
        .post("/user/register")
        .send(registerInfoFail)
        .expect(400)
})

test("register fails", async () =>{
    const registerInfoFail = { email: "test@test.com", name: "test", password: "abcde12345" }
    await api
        .post("/user/register")
        .send(registerInfoFail)
        .expect(409)
        .expect({ duplicated: 'Duplicated Email' })
})

test("register succed", async () =>{
    const registerInfoSucced = { email: "test1@test.com", name: "test1", password: "abcde12345" }
    await api
        .post("/user/register")
        .send(registerInfoSucced)
        .expect(201)
    user.deleteOne({ email: "test1@test.com"})
})

test("trying to change password when not logged in causes an unauthorized", async () => {
    const changepasswordInfoFail = {oldPassword: "abcde12345", newPassword: "12345abcde", email: "test1@test.com"}
    await api
        .put("/user/changepassword")
        .send(changepasswordInfoFail)
        .expect(401)
    })

test("changePassword succed", async () =>{
    const changepasswordInfoSucced = {oldPassword: "abcde12345", newPassword: "12345abcde"}
    await api
        .put("/user/changepassword").set('Authorization', token1)
        .send(changepasswordInfoSucced)
        .expect(200)
})

test("changePassword fails", async () =>{
    const changepasswordInfoSucced = {newPassword: "abcde12345"}
    await api
        .put("/user/changepassword").set('Authorization', token1)
        .send(changepasswordInfoSucced)
        .expect(400)
})

test("changePassword fails", async () =>{
    const changepasswordInfoSucced = {oldPassword: "abcde12345", newPassword: "abcde12345"}
    await api
        .put("/user/changepassword").set('Authorization', token1)
        .send(changepasswordInfoSucced)
        .expect(400)
})
/*
test("changePassword fails", async () =>{
    const changepasswordInfoFail = {}
    await api
        .post("/user/changepassword")
        .send(changepasswordInfoFail)
        .expect(500)
})*/

test("delete a timeline", async () => {
    const newEntry = { title: "title of the entry", date: { year: 2001, month: 1, day: 2, ce: true }, text: "This is a new entry" }
    const timelineExampledelete = { title: 'Time line with 1 entries', subtitle: 'there is a new entry', category: Category.GEOGRAPHY, entries: [newEntry] }
    const timeline = await api
        .post("/timeline/").set('Authorization', token)
        .send(timelineExampledelete).then(res => {
            return res.body
        })
    await api
        .get("/timeline/" + timeline._id)
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body).toStrictEqual(timeline)
        })
    await api
        .delete("/timeline/" + timeline._id).set('Authorization', token)
        .expect(200)
    
    await api
        .get("/timeline/" + timeline._id)
        .expect(404)
        .then()
});

beforeAll(async () => {
    server = connect()
    await timeline.deleteMany({})
    await user.deleteMany({})
    token = (await api
        .post('/user/register')
        .send({ email: "test@test.com", name: "test", password: "abcde12345" })).body.token
})


beforeEach(async () => {
    await timeline.deleteMany({})
    await user.deleteOne({email: "testing@test.com"})
    token1 = (await api
        .post('/user/register')
        .send({ email: "testing@test.com", name: "testing", password: "abcde12345" })).body.token
})

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})
async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()
}

function createATimelineWith2Entries() {
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
