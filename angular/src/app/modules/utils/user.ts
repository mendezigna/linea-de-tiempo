export class User {
    preferences : Preferences = new Preferences()
    name : string = ""
}

export class Preferences {
    language : string = "english"
    theme : string = "light"
}