export class Categoria {
    HISTORIA: String = 'HISTORIA'
    GEOGRAFIA: String = 'GEOGRAFIA'
    BIOGRAFIA: String = 'BIOGRAFIA'
    FICCION: String = 'FICCION'
    OTROS: String = 'OTROS'

    getCategorias() : Array<String> {
        return [this.HISTORIA, this.GEOGRAFIA, this.BIOGRAFIA, this.FICCION, this.OTROS]
    }
}