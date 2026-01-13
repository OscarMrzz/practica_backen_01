
import type { FastifyInstance } from "fastify"
import { createProducto, deleteByIdProducto, getAllProductos, getByIdProducto, updateByIdProducto } from "./productos.controller.js"



export async function productosRouter(fastify:FastifyInstance){
    fastify.get("/",getAllProductos)
    fastify.get("/:id_producto",getByIdProducto)
    fastify.post("/",createProducto)
    fastify.put("/:id_producto",updateByIdProducto)
    fastify.delete("/:id_producto",deleteByIdProducto)
}