import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {
  HISTORIA: String = 'HISTORIA';
  GEOGRAFIA: String = 'GEOGRAFIA';
  BIOGRAFIA: String = 'BIOGRAFIA';
  FICCION: String = 'FICCION';
  OTROS: String = 'OTROS';

  getCategorias(): {nombre: String, imagen: String}[] {
    return [
      {
        "nombre": this.HISTORIA,
        "imagen": "https://razonyrevolucion.org/wp-content/uploads/2020/04/libro-rese%C3%B1a.jpg"
      }
    ];
  }
}
