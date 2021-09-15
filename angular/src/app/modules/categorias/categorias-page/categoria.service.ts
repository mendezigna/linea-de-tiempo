import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {
  HISTORIA: String = 'HISTORIA';
  GEOGRAFIA: String = 'GEOGRAFIA';
  BIOGRAFIA: String = 'BIOGRAFIA';
  FICCION: String = 'FICCION';
  OTROS: String = 'OTROS';

  getCategorias(): String[] {
    return [
      this.HISTORIA, this.GEOGRAFIA, this.FICCION, this.BIOGRAFIA, this.OTROS
    ];
  }
}
