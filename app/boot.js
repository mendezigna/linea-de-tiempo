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
            fecha: '2020-08-05',
            texto: 'este es un punto de prueba :)'
    
        }]
    })
    crearLineaDeTiempo({
        titulo: 'linea 2 punto',
        categoria:Categoria.GEOGRAFIA,
        puntos: [{
            titulo: 'punto 1',
            fecha: '2020-08-05',
            texto: 'este es un punto de prueba :)'
    
        },
        {
            titulo: 'punto 2',
            fecha: '2020-09-05',
            texto: 'este es otro punto de prueba :O'
    
        }]
    })
}



async function crearLineaDeTiempo(datos){
    const linea = new lineaDeTiempo(datos)
    await linea.save()
    
}

module.exports = crearDatosIniciales