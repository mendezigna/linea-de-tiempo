import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../ui/material.module";
import { TimelinePageComponent } from "./lineadetiempo-page/timeline-page.component";
import { TimelineService } from "./timeline.service";
import { EntryComponent } from './punto/entry.component';
import { EntryDialogComponent } from './punto/entry-dialog/entry-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisualizationComponent } from './visualization/visualization.component';
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

const timelineRoutes : Routes = [
  {
    path: ':id',
    component: TimelinePageComponent,
  },
  {
    path: '',
    component: TimelinePageComponent,
  },

]

@NgModule({
  declarations: [TimelinePageComponent, EntryComponent, EntryDialogComponent, VisualizationComponent],
  imports: [
    RouterModule.forChild(timelineRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TimelineService],
  exports: [TimelinePageComponent]
}) export class TimelineModule {}
