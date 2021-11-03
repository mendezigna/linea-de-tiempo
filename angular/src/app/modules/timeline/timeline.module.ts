import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../ui/material.module";
import { TimelinePageComponent } from "./timeline-page/timeline-page.component";
import { TimelineService } from "./timeline.service";
import { EntryComponent } from './entry/entry.component';
import { EntryDialogComponent } from './entry/entry-dialog/entry-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisualizationComponent } from './visualization/visualization.component';
import { SharedModule } from "src/app/shared-module";
import { AuthGuard } from "src/app/guards/auth.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TimelineDialogComponent } from './timeline-dialog/timeline-dialog.component';
import { DeleteDialogComponent } from './timeline-dialog/delete-dialog/delete-dialog.component';
import { EmbeddedComponent } from "./embedded/embedded.component";
import { TextFieldComponent } from './fields/text-field/text-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { MediaFieldComponent } from './fields/media-field/media-field.component';
import { EraFieldComponent } from './fields/era-field/era-field.component';
import { SlideFieldComponent } from './fields/slide-field/slide-field.component';

const timelineRoutes : Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'embedded/:id',
    component: EmbeddedComponent
  },
  {
    path: 'view/:id',
    component: VisualizationComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: TimelinePageComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: TimelinePageComponent,
  }

]

@NgModule({
  declarations: [
    TimelinePageComponent,
    EntryComponent,
    EntryDialogComponent,
    VisualizationComponent,
    DashboardComponent,
    TimelineDialogComponent,
    DeleteDialogComponent,
    TextFieldComponent,
    DateFieldComponent,
    MediaFieldComponent,
    EraFieldComponent,
    SlideFieldComponent
  ],
  imports: [
    RouterModule.forChild(timelineRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    DragScrollModule
  ],
  providers: [TimelineService],
  exports: [TimelinePageComponent, EntryComponent, EntryDialogComponent, VisualizationComponent]
}) export class TimelineModule {}
