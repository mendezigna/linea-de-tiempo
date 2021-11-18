const timeline = require('./models/timeline');
const Category = require('./utils/category')
const user = require('./models/user');
const Scale = require('./utils/scale');
const example1 = require('./examples/Revolutionary User Interfaces')

async function initData() {

    await timeline.deleteMany({})
    await user.deleteMany({})

    createTimeline(example1)

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
    createTimeline({
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 7",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2007},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 8",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2008},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 9",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2009},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 10",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2010},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2010},
            text:{
                headline : "A, headline for the title 11",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2011},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2011}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2000},
            text:{
                headline : "A, headline for the title 12",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2012},
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
        events: [
            {start_date : {year: 1999}},
            {start_date : {year: 2000}}
        ],
        title: {
            start_date : {year: 1999},
            end_date : {year: 2012},
            text:{
                headline : "A, headline for the title 13",
                text : "A String for the title"
            }
        },
        eras: [{
            start_date : {year: 1998},
            end_date : {year: 2013},
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