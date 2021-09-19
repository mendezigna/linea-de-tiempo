
export class LineaDeTiempo{
    titulo: String = '';
    categoria: String = '';
    puntos: Punto[] = [];
    _id : String = ''
}

export class Punto{
    titulo: String ='';
    fecha: Date = new Date;
    texto: String = '';
    _id : String = ''
}