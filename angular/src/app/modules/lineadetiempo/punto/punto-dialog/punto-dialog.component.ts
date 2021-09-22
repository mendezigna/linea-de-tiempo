import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Punto } from 'src/app/modules/utils/LineaDeTiempo';

@Component({
  selector: 'app-punto-dialog',
  templateUrl: './punto-dialog.component.html',
  styleUrls: ['./punto-dialog.component.css']
})
export class PuntoDialogComponent {

  public titulo: String = ''
  public texto: String = ''
  public fecha: { anho: Number, mes: Number, dia: Number, dc: Boolean } = { anho: 2021, mes: 1, dia: 1, dc: true };
  public form: FormGroup
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<PuntoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { punto: Punto, titulo: String }) {
    this.titulo = data.punto.titulo
    this.fecha = { anho: data.punto.fecha.anho, mes: data.punto.fecha.mes, dia: data.punto.fecha.dia, dc: data.punto.fecha.dc }
    this.texto = data.punto.texto
    this.form = fb.group({
      titulo: [this.titulo],
      texto: [this.texto],
      anho: [this.fecha.anho, [Validators.required, Validators.min(1)]],
      mes: [this.fecha.mes, [Validators.min(1), Validators.max(12)]],
      dia: [this.fecha.dia, [Validators.min(1)]],
      dc: [this.fecha.dc, [Validators.required]],
    }, {
      validators: [this.diaValido()],
    });
  }
  esBisiesto(anho: number): boolean {
    return (anho % 400 === 0) ? true : (anho % 100 === 0) ? false : anho % 4 === 0;

  }

  diaValido() {
    return (c: AbstractControl) => {
      const anho: number = c.get("anho")?.value;
      const mes: number = c.get("mes")?.value;
      const dia: number = c.get("dia")?.value;
      const dias = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if ((!this.esBisiesto(anho) && mes == 2 && dia > 28) || dia > dias[mes - 1] || dia > 31 || (!mes && dia)) {
        c.get('dia')?.setErrors({ invalid: true })
        return { invalid: true }
      } else {
        c.get('dia')?.setErrors(null)
        return null
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const errors = this.form.errors;
    if (!this.form.invalid && !errors) {
      const newPunto = new Punto()
      newPunto._id = this.data.punto._id ? this.data.punto._id : undefined
      newPunto.fecha = this.fecha
      newPunto.titulo = this.titulo ? this.titulo : "Sin titulo"
      newPunto.texto = this.texto

      this.dialogRef.close(newPunto);
    }

  }
}
