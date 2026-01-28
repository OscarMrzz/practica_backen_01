import type { FastifyInstance } from "fastify";
import type { productoInterface, responseInterface } from "./productos.interface.js";


export class ProductosModel {
   
  static  async  getAll(req:FastifyInstance, offset: number, limit: number | null, page:number =1) {
        let query = "SELECT * FROM productos";
        const queryCount = "SELECT COUNT(*) FROM productos";
        let total = 0;
       
   
      
  
        const params: any[] = [];
              if(limit){

            query += " LIMIT $1 OFFSET $2";
            params.push(limit, offset);
            
        }
        const { rows: data } = await req.pg.query<productoInterface>(query, params);
        const { rows: count } = await req.pg.query<{ count: number }>(queryCount);
        total = count[0].count;

        const respuesta: responseInterface ={
            page,
            limit,
            total,
            data
        }
        return respuesta;


        
    }


   static async getById(req:FastifyInstance, id_producto: string) {
        const query = "SELECT * FROM productos WHERE id_producto=$1";
        const params: any[] = [id_producto];
        const { rows } = await req.pg.query<productoInterface>(query, params);
        return rows;
    }
    
  static  async create(req:FastifyInstance, producto: Omit<productoInterface, "id_producto" | "created_at_producto">) {
        const query = "INSERT INTO productos (nombre_producto,precio_compra_producto,precio_venta_producto) VALUES ($1,$2,$3) RETURNING *";
        const params: any[]=[]
        params.push(
            producto.nombre_producto,
            producto.precio_compra_producto,
            producto.precio_venta_producto,
        );
        const { rows } = await req.pg.query<productoInterface>(query, params);
        return rows;
    }
    
   static async updateById(req:FastifyInstance, id_producto: string, producto: Omit<productoInterface, "id_producto" | "created_at_producto">) {
        const query = "UPDATE productos SET nombre_producto=$1,precio_compra_producto=$2,precio_venta_producto=$3 WHERE id_producto=$4 RETURNING *";
        const params: any[]=[]
        params.push(
              producto.nombre_producto,
            producto.precio_compra_producto,
            producto.precio_venta_producto,
            id_producto,

        )
        const { rows } = await req.pg.query<productoInterface>(query, params);
        return rows;
    }
    
  static  async deleteById(req:FastifyInstance, id_producto: string) {
        const query = "DELETE FROM productos WHERE id_producto=$1 RETURNING *";
        const { rows } = await req.pg.query<productoInterface>(query, [id_producto]);
        return rows;
    }
}



