
import type { FastifyInstance } from "fastify"
import { createProducto, deleteByIdProducto, getAllProductos, getByIdProducto, updateByIdProducto } from "./productos.controller.js"



export async function productosRouter(fastify:FastifyInstance){
    fastify.get("/",getAllProductos)
    fastify.get("/:idProducto",getByIdProducto)
    fastify.post("/",createProducto)
    fastify.put("/:idProducto",updateByIdProducto)
    fastify.delete("/:idProducto",deleteByIdProducto)
}