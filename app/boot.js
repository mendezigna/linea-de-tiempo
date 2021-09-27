const timeline = require('./models/timeline');
const Category = require('./utils/category')

async function initData() {

    await timeline.deleteMany({})

    createTimeline({
        title: 'Time line with 0 entrys',
        category: Category.HISTORY,
        entrys: []
    })
    createTimeline({
        title: 'Time line with 1 entry',
        category: Category.GEOGRAPHY,
        entrys: [{
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
        title: 'Time line with 2 entrys',
        category: Category.GEOGRAPHY,
        entrys: [{
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



async function createTimeline(data) {
    const tl = new timeline(data)
    await tl.save()

}

module.exports = initData