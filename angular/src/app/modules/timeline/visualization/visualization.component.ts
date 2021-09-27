import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EntryDate, Timeline, Entry } from '../../utils/timeline';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent implements OnInit {

  @Input('linea-de-tiempo')
  timeline!: Timeline;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = false
    config.showNavigationArrows = true
    config.wrap = false
  }

  ngOnInit(): void {
  }
  orderEntries() {
    const entriesDC = this.timeline.entries.filter(entry => entry.date.dc)
      .sort((a, b) => (a.date.day ? a.date.day.valueOf() : 0) - (b.date.day ? b.date.day.valueOf() : 0))
      .sort((a, b) => (a.date.month ? a.date.month.valueOf() : 0) - (b.date.month ? b.date.month.valueOf() : 0))
      .sort((a, b) => (a.date.year ? a.date.year.valueOf() : 0) - (b.date.year ? b.date.year.valueOf() : 0))
    const entriesAC = this.timeline.entries.filter(entry => !entry.date.dc)
      .sort((a, b) => (a.date.day ? a.date.day.valueOf() : 0) - (b.date.day ? b.date.day.valueOf() : 0))
      .sort((a, b) => (a.date.month ? a.date.month.valueOf() : 0) - (b.date.month ? b.date.month.valueOf() : 0))
      .sort((a, b) => (b.date.year ? b.date.year.valueOf() : 0) - (a.date.year ? a.date.year.valueOf() : 0))
    return entriesAC.concat(entriesDC)
  }

  dateFormateada(date: EntryDate) {
    const year = date.year
    const month = date.month ? date.month : "XX"
    const day = date.day ? date.day : "XX"
    const dc = date.dc ? "DC" : "AC"

    return `${year} - ${month} - ${day} ${dc}`
  }

  orderEntriesByDate() {
    const entries = this.orderEntries()
    const entriesOrderedByDate: { date: string, entries: Entry[] }[] = []
    entries.forEach(entry => {
      const formateada = this.dateFormateada(entry.date)
      const datePorEntry = entriesOrderedByDate.find(datePorEntry => datePorEntry.date == formateada)
      if (datePorEntry) {
        datePorEntry.entries.push(entry)
      } else {
        entriesOrderedByDate.push({ date: formateada, entries: [entry] })
      }
    })
    return entriesOrderedByDate
  }
}
