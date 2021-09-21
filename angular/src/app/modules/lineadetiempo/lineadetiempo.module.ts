import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../ui/material.module";
import { LineadetiempoComponent } from "./lineadetiempo-page/lineadetiempo.component";
import { LineaDeTiempoService } from "./lineadetiempo.service";
import { PuntoComponent } from './punto/punto.component';
import { PuntoDialogComponent } from './punto/punto-dialog/punto-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisualizacionComponent } from './visualizacion/visualizacion.component';
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

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
  declarations: [LineadetiempoComponent, PuntoComponent, PuntoDialogComponent, VisualizacionComponent],
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
  exports: [LineadetiempoComponent]
}) export class LineaDeTiempoModule {}
