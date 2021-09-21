const lineaDeTiempo = require('./models/lineaDeTiempo');
const Categoria = require('./utils/categoria')

async function crearDatosIniciales(){

    await lineaDeTiempo.deleteMany({})

    crearLineaDeTiempo({
        titulo: 'linea 0 puntos',
        categoria:Categoria.HISTORIA,
        puntos: []
    })
    crearLineaDeTiempo({
        titulo: 'linea 1 punto',
        categoria:Categoria.GEOGRAFIA,
        puntos: [{
            titulo: 'punto 1',
            fecha: {anho:1999, mes:1, dia:1},
            texto: 'este es un punto de prueba :)'
    
        }]
    })
    crearLineaDeTiempo({
        titulo: 'linea 2 punto',
        categoria:Categoria.GEOGRAFIA,
        puntos: [{
            titulo: 'punto 1',
            fecha: {anho:1999, mes:1, dia:2},
            texto: 'este es un punto de prueba :)'
    
        },
        {
            titulo: 'punto 2',
            fecha: {anho:1999, mes:1, dia:1},
            texto: 'este es otro punto de prueba :O'
    
        }]
    })
}



async function crearLineaDeTiempo(datos){
    const linea = new lineaDeTiempo(datos)
    await linea.save()
    
}

module.exports = crearDatosIniciales