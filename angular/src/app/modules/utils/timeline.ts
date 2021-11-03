// export class TimelineModel {


//     title: string = '';
//     subtitle: string = '';
//     media: string = '';
//     category: string = '';
//     entries: Entry[] = [];
//     published: boolean = false;
//     owner: string = ''
//     _id: string = ''

//     constructor(title: string, subtitle: string, category: string, entries: Entry[], id: string, published = false, owner = '', media = '') {
//         this.title = title
//         this.subtitle = subtitle,
//             this.category = category
//         this.entries = entries,
//             this.published = published
//         this.owner = owner
//         this.media = media
//         this._id = id
//     }

//     toTimelineJs = () => {
//         return new Timelinejs(this.title, this.subtitle, this.media, this.entries)
//     }
//     nextId(): string {
//         return `${this.entries.length == 0 ? 0 : parseInt(this.entries[this.entries.length - 1].timelineId) + 1}`
//     }
// }

// export class Entry {
//     title: string = '';
//     date: EntryDate = new EntryDate(2021, 1, 1, true);
//     text: string = '';
//     media: string = ''
//     _id: string | undefined = ''
//     timelineId: string = '0'

//     constructor(title: string = '', date: EntryDate, text: string = '', media: string = '', id: string | undefined, timlineId: string = '') {
//         this.text = text
//         this.title = title
//         this.date = date
//         this._id = id
//         this.timelineId = timlineId
//         this.media = media
//     }

//     toEvent() {
//         return {
//             start_date: this.date.toDate(),
//             text: {
//                 headline: this.title,
//                 text: this.text || ''
//             },
//             unique_id: this.timelineId,
//             media: {
//                 url: this.media,
//             }
//         }
//     }
// }

// export class EntryDate {
//     year: number = 2021;
//     month: number = 1;
//     day: number = 1;
//     ce: boolean = true

//     constructor(year: number, month: number, day: number, ce: boolean = true) {
//         this.year = year
//         this.month = month
//         this.day = day
//         this.ce = ce
//     }

//     toDate() {
//         return {
//             year: this.ce ? this.year : this.year * -1,
//             month: this.month,
//             day: this.day,
//         }
//     }

// }

export class TimelineModel {

    title: TimelineSlide;
    events: TimelineSlide[]
    category: string
    published: boolean
    owner: string 
    scale: string
    eras : TimelineEra[] 
    _id: string


    constructor(
        title: TimelineSlide = new TimelineSlide(),
        events: TimelineSlide[] = [],
        category: string = "OTHER", 
        published: boolean = false,
        owner: string = '',
        scale: string = Scale.HUMAN,
        eras: TimelineEra[] = [],
        _id: string = ''
    ) {
        this.title = title
        this.events = events
        this.category = category
        this.published = published
        this.owner = owner
        this.scale = scale
        this.eras = eras
        this._id = _id
    }


    nextId(): string {
        return `${this.events.length == 0 ? 0 : parseInt(this.events[this.events.length - 1].unique_id) + 1}`
    }
}

export class TimelineText {
    headline: string
    text: string

    constructor(headline: string = '', text: string = '') {
        this.headline = headline
        this.text = text
    }

}

export class TimelineDate {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
    milisecond: number
    display_date: string


    constructor(
        year: number = 2021,
        month: number = 0,
        day: number = 0,
        hour: number = 0,
        minute: number = 0,
        second: number = 0,
        milisecond: number = 0,
        display_date: string = ''
    ) {
        this.year = year
        this.month = month
        this.day = day
        this.hour = hour
        this.minute = minute
        this.second = second
        this.milisecond = milisecond
        this.display_date = display_date
    }

}

export class TimelineMedia {
    url: string
    caption: string
    credit: string
    thumbnail: string
    alt: string
    title: string
    link: string
    link_target: string


    constructor(
        url: string = '',
        caption: string = '',
        credit: string = '',
        thumbnail: string = '',
        alt: string = '',
        title: string = '',
        link: string = '',
        link_target: string = ''
    ) {
        this.url = url
        this.caption = caption
        this.credit = credit
        this.thumbnail = thumbnail
        this.alt = alt
        this.title = title
        this.link = link
        this.link_target = link_target
    }

}

export class TimelineEra {
    start_date: TimelineDate
    end_date: TimelineDate
    text: TimelineText


    constructor(start_date: TimelineDate, end_date: TimelineDate, text: TimelineText) {
        this.start_date = start_date
        this.end_date = end_date
        this.text = text
    }

}

export class TimelineSlide {
    start_date: TimelineDate
    end_date: TimelineDate
    text: TimelineText
    media: TimelineMedia
    group: string
    display_date: string
    background: { url: string, color: string }
    autolink: boolean
    unique_id: string


    constructor(
        start_date: TimelineDate = new TimelineDate(),
        end_date: TimelineDate = new TimelineDate(),
        text: TimelineText = new TimelineText(),
        media: TimelineMedia = new TimelineMedia(),
        group: string = '',
        display_date: string = '',
        background: { url: string, color: string } = { url: '', color: '' },
        autolink: boolean = true,
        unique_id: string = ''
    ) {
        this.start_date = start_date
        this.end_date = end_date
        this.text = text
        this.media = media
        this.group = group
        this.display_date = display_date
        this.background = background
        this.autolink = autolink
        this.unique_id = unique_id
    }

}

export const Scale = {
    HUMAN: "human",
    COSMOLOGICAL: "cosmological",
}