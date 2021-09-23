import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../ui/material.module";
import { LineaDeTiempoPageComponent } from "./lineadetiempo-page/linea-de-tiempo-page.component";
import { LineaDeTiempoService } from "./linea-de-tiempo.service";
import { PuntoComponent } from './punto/punto.component';
import { PuntoDialogComponent } from './punto/punto-dialog/punto-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisualizacionComponent } from './visualizacion/visualizacion.component';
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

const lineaDeTiempoRoutes : Routes = [
  {
    path: ':id',
    component: LineaDeTiempoPageComponent,
  },
  {
    path: '',
    component: LineaDeTiempoPageComponent,
  },

]

@NgModule({
  declarations: [LineaDeTiempoPageComponent, PuntoComponent, PuntoDialogComponent, VisualizacionComponent],
  imports: [
    RouterModule.forChild(lineaDeTiempoRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [LineaDeTiempoService],
  exports: [LineaDeTiempoPageComponent]
}) export class LineaDeTiempoModule {}
