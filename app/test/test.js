const mongoose = require('mongoose');
const request = require('superagent');
const supertest = require('supertest');
const app = require("../app");
const timeline = require('../models/timeline');
const user = require('../models/user');
const Category = require('../utils/category');
const Scale = require('../utils/scale');
const port = process.env.TEST_PORT;
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
        owner: "test@test.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 6",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.OTHER,
        published: true,
    }
    await api
        .post("/timeline/").set('Authorization', token)
        .send(timelineExample)
        .expect(201)
        .expect('Content-type', /json/).then(res => {
            expect(res.body.title.start_date.year).toBe(timelineExample.title.start_date.year)
            expect(res.body.category).toBe(timelineExample.category)
            expect(res.body.events[0].start_date.year).toEqual(timelineExample.events[0].start_date.year)
        })
});

test("When you post a timeline its stored in the database", async () => {
    const timelineExample = {
        owner: "test@test.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 6",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.OTHER,
        published: true,
    }
    await api
        .post("/timeline/").set('Authorization', token)
        .send(timelineExample).then(res => { })
    await api
        .get("/timeline/")
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body[0].title.start_date.year).toBe(timelineExample.title.start_date.year)
            expect(res.body[0].category).toBe(timelineExample.category)
            expect(res.body[0].events[0].start_date.year).toEqual(timelineExample.events[0].start_date.year)
        })
});

test("When you put a timeline its updated in the database", async () => {
    const timelineExample = {
        owner: "test@test.com",
        events: [{start_date : {year: 1999}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 6",
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
            text:{
                headline : "A, headline for the era",
            }
        }],
        category: Category.OTHER,
        published: true,
    }
    const timelineExampleUpdated = {
        events: [{start_date : {year: 1999}},{start_date : {year: 2000}}],
        title: {start_date : {year: 1999},
            end_date : {year: 2000},
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
        }],
        category: Category.OTHER,
        published: true,
    }
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
            expect(res.body.title.start_date.year).toBe(timelineExample.title.start_date.year)
            expect(res.body.category).toBe(timelineExampleUpdated.category)
            expect(res.body.events[1].start_date.year).toStrictEqual(timelineExampleUpdated.events[1].start_date.year)
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
    const timelineExampledelete = {
        owner: "test@test.com",
        events: [{start_date : {year: 1999}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 6",
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
            text:{
                headline : "A, headline for the era",
            }
        }],
        category: Category.OTHER,
        published: true,
    }
    const timeline = await api
        .post("/timeline/").set('Authorization', token)
        .send(timelineExampledelete).then(res => {
            return res.body
        })
    await api
        .get("/timeline/view/" + timeline._id)
        .expect(200)
        .expect('Content-type', /json/).then(res => {
            expect(res.body).toStrictEqual(timeline)
        })
    await api
        .delete("/timeline/" + timeline._id).set('Authorization', token)
        .expect(200)
    
    await api
        .get("/timeline/view/" + timeline._id)
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 6",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2006},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.OTHER,
        published: true,
    })
}

function connect() {
    mongoose.connect(MONGO_URL).then((res) => {
    }).catch();
    return app.listen(port)
}
