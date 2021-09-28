
export class Timeline{
    title: String = '';
    subtitle: String = '';
    category: String = '';
    entries: Entry[] = [];
    _id : String = ''
}

export class Entry{
    title: String ='';
    date: EntryDate = {year:2021, month:1, day:1, ad: true};
    text: String = '';
    _id : String | undefined = ''
}

export class EntryDate {
    year : Number = 2021;
    month : Number = 1;
    day : Number = 1; 
    ad: Boolean = true
}