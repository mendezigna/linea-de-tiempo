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

    title: TimelineSlide | undefined;
    events: TimelineSlide[]
    category: string
    published: boolean
    owner: string
    scale: string
    eras: TimelineEra[] | undefined
    _id: string


    constructor(
        title: TimelineSlide | undefined = undefined,
        events: TimelineSlide[] = [],
        category: string = "OTHER",
        published: boolean = false,
        owner: string = '',
        scale: string = Scale.HUMAN,
        eras: TimelineEra[] | undefined = undefined,
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


    public nextId(): string {
        return `${this.events.length == 0 ? 0 : parseInt(this.events[this.events.length - 1].unique_id!) + 1}`
    }
}

export class TimelineText {
    headline: string | undefined
    text: string | undefined

    constructor(headline: string | undefined = undefined, text: string | undefined = undefined) {
        this.headline = headline
        this.text = text
    }

}

export class TimelineDate {
    year: number | undefined
    month: number | undefined
    day: number | undefined
    hour: number | undefined
    minute: number | undefined
    second: number | undefined
    milisecond: number | undefined
    display_date: string | undefined


    constructor(
        year: number | undefined = undefined,
        month: number | undefined = undefined,
        day: number | undefined = undefined,
        hour: number | undefined = undefined,
        minute: number | undefined = undefined,
        second: number | undefined = undefined,
        milisecond: number | undefined = undefined,
        display_date: string | undefined = undefined
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
    caption: string | undefined
    credit: string | undefined
    thumbnail: string | undefined
    alt: string | undefined
    title: string | undefined
    link: string | undefined
    link_target: string | undefined


    constructor(
        url: string = "",
        caption: string | undefined = undefined,
        credit: string | undefined = undefined,
        thumbnail: string | undefined = undefined,
        alt: string | undefined = undefined,
        title: string | undefined = undefined,
        link: string | undefined = undefined,
        link_target: string | undefined = undefined
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
    text: TimelineText | undefined


    constructor(start_date: TimelineDate, end_date: TimelineDate, text: TimelineText | undefined) {
        this.start_date = start_date
        this.end_date = end_date
        this.text = text
    }

}

export class TimelineSlide {
    start_date: TimelineDate | undefined
    end_date: TimelineDate | undefined
    text: TimelineText | undefined
    media: TimelineMedia | undefined
    group: string | undefined
    display_date: string | undefined
    background: { url: string | undefined, color: string | undefined } | undefined
    autolink: boolean
    unique_id: string | undefined


    constructor(
        start_date: TimelineDate | undefined = undefined,
        end_date: TimelineDate | undefined = undefined,
        text: TimelineText | undefined = undefined,
        media: TimelineMedia | undefined = undefined,
        group: string | undefined = undefined,
        display_date: string | undefined = undefined,
        background: { url: string | undefined, color: string | undefined } | undefined = undefined,
        autolink: boolean = true,
        unique_id: string | undefined = undefined
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