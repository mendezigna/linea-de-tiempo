
export class LineaDeTiempo{
    titulo: String = '';
    categoria: String = '';
    puntos: Punto[] = [];
    _id : String = ''
}

export class Punto{
    titulo: String ='';
    fecha: {anho:Number, mes:Number, dia:Number, dc: Boolean} = {anho:2021, mes:1, dia:1, dc: true};
    texto: String = '';
    _id : String | undefined = ''
}