
import type { FastifyInstance } from "fastify"
import ProductosController from "./productos.controller.js"



export async function productosRouter(fastify:FastifyInstance){
    fastify.get("/",ProductosController.getAll)
    fastify.get("/:id_producto",ProductosController.getById)
    fastify.post("/",ProductosController.create)
    fastify.put("/:id_producto",ProductosController.updateById)
    fastify.delete("/:id_producto",ProductosController.deleteById)
}