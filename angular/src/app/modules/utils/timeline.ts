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
    ad: boolean | undefined

    constructor(
        year: number | undefined = undefined,
        month: number | undefined = undefined,
        day: number | undefined = undefined,
        hour: number | undefined = undefined,
        minute: number | undefined = undefined,
        second: number | undefined = undefined,
        milisecond: number | undefined = undefined,
        display_date: string | undefined = undefined,
        ad: boolean | undefined = undefined
    ) {
        this.year = year
        this.month = month
        this.day = day
        this.hour = hour
        this.minute = minute
        this.second = second
        this.milisecond = milisecond
        this.display_date = display_date
        this.ad = ad
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
    autolink: boolean | undefined
    unique_id: string | undefined


    constructor(
        start_date: TimelineDate | undefined = undefined,
        end_date: TimelineDate | undefined = undefined,
        text: TimelineText | undefined = undefined,
        media: TimelineMedia | undefined = undefined,
        group: string | undefined = undefined,
        display_date: string | undefined = undefined,
        background: { url: string | undefined, color: string | undefined } | undefined = undefined,
        autolink: boolean | undefined = undefined,
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