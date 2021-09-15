
export class LineaDeTiempo{
    titulo: String = '';
    categoria: String = '';
    puntos: Punto[] = [];
    
}

export class Punto{
    titulo: String ='';
    fecha: Date = new Date;
    texto: String ='';
}