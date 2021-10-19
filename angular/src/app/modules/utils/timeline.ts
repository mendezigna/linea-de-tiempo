export class TimelineModel {
    title: string = '';
    subtitle: string = '';
    media: string = '';
    category: string = '';
    entries: Entry[] = [];
    published: boolean = false;
    owner : string = ''
    _id: string = ''

    constructor(title : string, subtitle: string, category : string, entries: Entry[], id : string, published = false, owner = '', media = ''){
        this.title = title
        this.subtitle = subtitle,
        this.category = category
        this.entries = entries,
        this.published = published
        this.owner = owner
        this.media = media
        this._id = id
    }

    toTimelineJs = () => {
        return {
            title: {
                text: {
                    headline: this.title,
                    text: `${this.subtitle || ""}`
                }
            },
            events: this.entries.map(entry => entry.toEvent())
        }
    }
    nextId() : string{
        return `${this.entries.length == 0 ? 0 : parseInt(this.entries[this.entries.length - 1].timelineId) + 1}`
    }
}

export class Entry {
    title: string = '';
    date: EntryDate = new EntryDate(2021, 1,1,true);
    text: string = '';
    media: string = ''
    _id: string | undefined = ''
    timelineId : string = '0'

    constructor(title: string = '', date : EntryDate, text : string = '', media : string = '', id : string | undefined, timlineId : string = ''){
        this.text = text
        this.title = title
        this.date = date
        this._id = id
        this.timelineId = timlineId
        this.media = media
    }

    toEvent() {
        return {
            start_date: this.date.toDate(),
            text: {
                headline: this.title,
                text: this.text || ''
            },
            unique_id: this.timelineId,
            media: {
                url: this.media,
            }
        }
    }
}

export class EntryDate {
    year: number = 2021;
    month: number = 1;
    day: number = 1;
    ad: boolean = true

    constructor(year : number, month: number, day : number, ad : boolean = true){
        this.year = year
        this.month = month
        this.day = day
        this.ad = ad
    }

    toDate(){
        return {
            year: this.ad ? this.year : this.year * -1,
            month: this.month,
            day: this.day,
        }
    }

}


