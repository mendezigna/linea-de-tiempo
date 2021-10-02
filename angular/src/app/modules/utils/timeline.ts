
export class Timeline {
    title: string = '';
    subtitle: string = '';
    category: string = '';
    entries: Entry[] = [];
    _id: string = ''
}

export class Entry {
    title: String = '';
    date: EntryDate = new EntryDate();
    text: String = '';
    _id: String | undefined = ''
}

export class EntryDate {
    year: number = 2021;
    month: number = 1;
    day: number = 1;
    ad: boolean = true

}


