
export class Timeline {
    title: string = '';
    subtitle: string = '';
    category: string = '';
    entries: Entry[] = [];
    _id: string = ''

    constructor(title : string, subtitle: string, category : string, entries: Entry[], id : string){
        this.title = title
        this.subtitle = subtitle,
        this.category = category
        this.entries = entries,
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
}

export class Entry {
    title: String = '';
    date: EntryDate = new EntryDate(2021, 1,1,true);
    text: String = '';
    _id: String | undefined = ''

    toEvent() {
        return {
            start_date: this.date.toDate(),
            text: {
                headline: this.title,
                text: this.text || ''
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
            year: this.year,
            month: this.month,
            day: this.day,
        }
    }

}


