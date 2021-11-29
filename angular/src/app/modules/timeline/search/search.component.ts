import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineModel } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: TimelineService, private router: Router) { }
  name: string = ""
  timelines: TimelineModel[] = []
  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      this.name = routeParams.name
      this.service.getWithName(this.name).then(data => {
        this.timelines = data
      });
    })


  }

  goToTimeline(id: String) {
    this.router.navigate(['/timeline', id])
  }
}
