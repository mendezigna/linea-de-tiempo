
export class LineaDeTiempo{
    titulo: String = '';
    categoria: String = '';
    puntos: Punto[] = [];
    _id : String = ''
}

export class Punto{
    titulo: String ='';
    fecha: Fecha = {anho:2021, mes:1, dia:1, dc: true};
    texto: String = '';
    _id : String | undefined = ''
}

export class Fecha {
    anho : Number = 2021;
    mes : Number = 1;
    dia : Number = 1; 
    dc: Boolean = true
}