export interface Purchase {
    id_compra: number,
    titulo: string,
    precio: {
        total: number,
        moneda: string,
    },
    cantidad: 3,
    fecha: string,
    imagen: string,
    vendedor: {
        id: number,
        nickname: string,
    },
    id_transaccion: number,
    id_envio: number,
}