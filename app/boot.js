const timeline = require('./models/timeline');
const Category = require('./utils/category')
const user = require('./models/user')

async function initData() {

    await timeline.deleteMany({})
    await user.deleteMany({})

    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.BIOGRAPHY,
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.FICTION,
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.HISTORY,
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry :OOOOOOOOOOOOOOOOOOOOOOOOOOO',
        published: true,
        category: Category.OTHER,
        owner: 'user1@admin.com',
        collaborators: ["admin@admin.com"],
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })

    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    createTimeline({
        title: 'Time line with 1 entry',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
        entries: [{
            title: 'Entry 1',
            date: {
                year: 1999,
                month: 1,
                day: 1
            },
            text: 'Test :)'

        }]
    })
    
    createTimeline({
        title: 'Time line with 2 entries',
        published: true,
        category: Category.GEOGRAPHY,
        owner: 'user1@admin.com',
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
    user.create({name: "admin", password: "admin1", email: "admin@admin.com"})
    user.create({name: "user1", password: "user123", email: "user1@admin.com"})
}



async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()

}

module.exports = initData