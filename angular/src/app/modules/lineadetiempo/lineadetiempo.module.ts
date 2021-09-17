import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../ui/material.module";
import { LineadetiempoComponent } from "./lineadetiempo.component";
import { LineaDeTiempoService } from "./lineadetiempo.service";

const lineaDeTiempoRoutes : Routes = [
  {
    path: ':id',
    component: LineadetiempoComponent,
  },
  {
    path: '',
    component: LineadetiempoComponent,
  }
]

@NgModule({
  declarations: [LineadetiempoComponent],
  imports: [
    RouterModule.forChild(lineaDeTiempoRoutes),
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [LineaDeTiempoService],
  exports: [LineadetiempoComponent]
}) export class LineaDeTiempoModule {}
