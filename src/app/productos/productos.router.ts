import type { FastifyInstance } from "fastify"
import { createProducto, deleteByIdProducto, getAllProductos, getByIdProducto, updateByIdProducto } from "./productos.controller.js"



export async function productosRouter(fastify:FastifyInstance){
    fastify.get("/productos",getAllProductos)
    fastify.get("/productos/:idProducto",getByIdProducto)
    fastify.post("/productos",createProducto)
    fastify.put("/productos/:idProducto",updateByIdProducto)
    fastify.delete("/productos/:idProducto",deleteByIdProducto)
}