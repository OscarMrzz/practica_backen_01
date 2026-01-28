export interface productoInterface{
    id_producto: string,
    created_at_producto: string,
   nombre_producto: string,
   precio_compra_producto: number,
   precio_venta_producto:number
   
}

export interface productoQueryInterface{
    page: number,
    limit: number
}

export interface responseInterface{
    page:number,
    limit:number | null,
    total:number,
    data:productoInterface[]
}
