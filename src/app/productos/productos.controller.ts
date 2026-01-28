import "@fastify/postgres";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { productoInterface, productoQueryInterface } from "@/app/productos/productos.interface.js";
import { ProductosModel } from "./productos.nodel.js";




export default class ProductosController {
 
  static  async getAll(req: FastifyRequest<{ Querystring: productoQueryInterface }>, replay: FastifyReply) {
        try {

            const page =req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : null;
            
            const offset = limit ? (page - 1) * limit : 0;
          

            

            const data = await ProductosModel.getAll(req.server, offset, limit,page);
            replay.send(data);
        } catch (error) {
            replay.status(500).send({ error: "Error al obtener productos" });
        }
    }
    
   static async getById(req: FastifyRequest, replay: FastifyReply) {
        try {
            const { id_producto } = req.params as { id_producto: string };
            const data = await ProductosModel.getById(req.server,id_producto);
            replay.send(data);
        } catch (error) {
            replay.status(500).send({ error: "Error al obtener producto" });
        }
    }
    
    
   static async create(req: FastifyRequest, replay: FastifyReply) {
        try {
            const producto: Omit<productoInterface, "id_producto" | "created_at_producto"> = req.body as Omit<productoInterface, "id_producto" | "created_at_producto">;
            const data = await ProductosModel.create(req.server,producto);
            replay.status(201).send(data);
        } catch (error) {
            req.log.error(error);
            replay.status(500).send({ error: "Error al crear producto", details: error,body:req.body });
        }
    }
    
   static async updateById(req: FastifyRequest, replay: FastifyReply) {
        try {
            const { id_producto } = req.params as { id_producto: string };
            const producto: Omit<productoInterface, "id_producto" | "created_at_producto"> = req.body as Omit<productoInterface, "id_producto" | "created_at_producto">;
            const data = await ProductosModel.updateById(req.server,id_producto, producto);
            replay.send(data);
        } catch (error) {
            req.log.error(error);
            replay.status(500).send({ error: "Error al actualizar producto", details: error,body:req.body });
        }
    }
    
   static async deleteById(req: FastifyRequest, replay: FastifyReply) {
        try {
            const { id_producto } = req.params as { id_producto: string };
            const data = await ProductosModel.deleteById(req.server,id_producto);
            replay.send(data);
        } catch (error) {
            req.log.error(error);
            replay.status(500).send({ error: "Error al eliminar producto", details: error,body:req.body });
        }
    }
}













