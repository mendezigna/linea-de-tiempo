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

const timelineRoutes : Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
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
  },

]

@NgModule({
  declarations: [TimelinePageComponent, EntryComponent, EntryDialogComponent, VisualizationComponent, DashboardComponent, TimelineDialogComponent],
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
