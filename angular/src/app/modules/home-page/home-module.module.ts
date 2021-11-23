import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { SharedModule } from 'src/app/shared-module';
import { HomePageComponent } from './home-page.component';
import { HomeService } from './home.service';
import { MaterialModule } from '../ui/material.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { Router, RouterModule, Routes } from '@angular/router';
import { TimelineCardComponent } from '../timeline-card/timeline-card.component';
import { AppModule } from 'src/app/app.module';
import { CategoryService } from '../categories/category.service';

const routes : Routes = [
  {
    path: '',
    component: HomePageComponent
  }

]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
    DragScrollModule
  ],
  providers: [HomeService, CategoryService],
  exports: [HomePageComponent]
})
export class HomeModule { }
