import "@fastify/postgres"
import type { FastifyRequest, FastifyReply} from 'fastify';
import type { productoModel } from '@/app/productos/productos.model.js';




export async function getAllProductos(req:FastifyRequest,replay:FastifyReply){
    try{

        const query ="SELECT * FROM productos"
        const {rows}= await req.server.pg.query<productoModel>(query)
        replay.send(rows)
    }
    catch(error){
        replay.status(500).send({error:"Error al obtener productos"})
    }
}

export async function getByIdProducto(req:FastifyRequest,replay:FastifyReply){
    try{
        const {idProducto}= req.params as {idProducto:string}
        const query ="SELECT * FROM productos WHERE id=$1"
        const {rows}= await req.server.pg.query(query,[idProducto])
        if(rows.length === 0){
            replay.status(404).send({error:"Producto no encontrado"})
        }
        else{
            replay.send(rows[0])
        }
    }
    catch(error){
        replay.status(500).send({error:"Error al obtener producto"})
    }
}

export async function createProducto(req:FastifyRequest,replay:FastifyReply){
    try{
        const producto: productoModel = req.body as productoModel
        const query ="INSERT INTO productos (nombre,precio,stock) VALUES ($1,$2,$3) RETURNING *"
        const {rows}= await req.server.pg.query(query,[producto.nombre_producto,producto.precio_compra_producto,producto.precio_venta_producto])
        replay.status(201).send(rows[0])
    }
    catch(error){
        replay.status(500).send({error:"Error al crear producto"})
    }


}

export async function updateByIdProducto(req:FastifyRequest,replay:FastifyReply){
    try{
        const {idProducto}= req.params as {idProducto:string}
        const producto: productoModel = req.body as productoModel
        const query ="UPDATE productos SET nombre=$1,precio=$2,stock=$3 WHERE id=$4 RETURNING *"
        const {rows}= await req.server.pg.query(query,[producto.nombre_producto,producto.precio_compra_producto,producto.precio_venta_producto,idProducto])
        if(rows.length === 0){
            replay.status(404).send({error:"Producto no encontrado"})
        }
        else{
            replay.send(rows[0])
        }
    }
    catch(error){
        replay.status(500).send({error:"Error al actualizar producto"})
    }
}

export async function deleteByIdProducto(req:FastifyRequest,replay:FastifyReply){
    try{
        const {idProducto}= req.params as {idProducto:string}
        const query ="DELETE FROM productos WHERE id=$1 RETURNING *"
        const {rows}= await req.server.pg.query(query,[idProducto])
        if(rows.length === 0){
            replay.status(404).send({error:"Producto no encontrado"})
        }
        else{
            replay.send(rows[0])
        }
    }
    catch(error){
        replay.status(500).send({error:"Error al eliminar producto"})
    }
}
