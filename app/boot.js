const timeline = require('./models/timeline');
const Category = require('./utils/category')
const user = require('./models/user');
const Scale = require('./utils/scale');
const example1 = require('./examples/Revolutionary User Interfaces')
const example2 = require('./examples/Whitney Houston 1963 - 2012')
const example3 = require('./examples/GIS Timeline')
const example5 = require('./examples/The Republican Run-Up')
const example4 = require('./examples/Sims')


async function initData() {

    await timeline.deleteMany({})
    await user.deleteMany({})

    createTimeline(example1)
    createTimeline(example2)
    createTimeline(example3)
    createTimeline(example4)
    createTimeline(example5)
    createTimeline({
        owner: "admin@admin.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 1",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2001},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.BIOGRAPHY,
        published: true,
    })
    createTimeline({
        owner: "admin@admin.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 2",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2002},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.FICTION,
        published: true,
    })
    createTimeline({
        owner: "user1@admin.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 3",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2003},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.HISTORY,
        published: true,
    })
    createTimeline({
        owner: "user1@admin.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 4",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2004},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.OTHER,
        published: true,
    })
    createTimeline({
        owner: "user1@admin.com",
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 5",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2005},
            text:{
                headline : "A, headline for the era",
                text : "A String for the era"
            }
        }],
        scale: Scale.HUMAN,

        category: Category.GEOGRAPHY,
        published: true,
    })
    createTimeline({
        owner: "user1@admin.com",
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


    user.create({name: "admin", password: "admin1", email: "admin@admin.com"})
    user.create({name: "user1", password: "user123", email: "user1@admin.com"})
}



async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()

}

module.exports = initData