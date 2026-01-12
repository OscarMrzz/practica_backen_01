//Ignorar el error de typescript
// @ts-ignore

import { describe, test, expect, beforeAll, afterAll } from "vitest";
import type { productoModel } from "@/app/productos/productos.model.js";
import { MiServidor } from "@/server.js";
import type { FastifyInstance } from "fastify";



beforeAll(async () => {
    const start = async (servidor: FastifyInstance) => {
      const port = process.env.PORT || 3003;
      servidor.listen({ port: Number(port), host: "0.0.0.0" });
      servidor.log.info(`Server listening on port ${port}`);
    };
    
    start(MiServidor());
 
});

afterAll(async () => {
  
});


describe("API de productos", () => {
  let id_producto: string;
     test("probar conexion", async () => {
        const response = await MiServidor().inject({
          method: "GET",
          url: "/",
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().conexionBackend).toEqual("OK");
        expect(response.json().conexionDB).toEqual("OK");

      
      });



      test("CREATE -> crear 1 productos",async ()=>{
  
        const response = await MiServidor().inject(
          {
            method: "POST",
            url: "/api/productos",
            payload: {
              nombre_producto: "Producto 1",
              precio_compra_producto: 100,
              precio_venta_producto: 150,
            }
          }
        )
        id_producto = response.json().id_producto;
        expect(response.statusCode).toBe(201);
   
      })

      test("GET BY ID -> leer 1 producto por id",async ()=>{
        const response = await MiServidor().inject(
          {
            method: "GET",
            url: `/api/productos/${id_producto}`,
          }
        )
        expect(response.statusCode).toBe(200);
        expect(response.json().id_producto).toBe(id_producto);
      })

      test("UPDATE BY ID -> actualizar 1 producto por id",async ()=>{
        const response = await MiServidor().inject(
          {
            method: "PUT",
            url: `/api/productos/${id_producto}`,
            payload: {
              nombre_producto: "Producto 1 Actualizado",
              precio_compra_producto: 120,
              precio_venta_producto: 180,
            }
          }
        )
        expect(response.statusCode).toBe(200);
        expect(response.json().id_producto).toBe(id_producto);
      })
      test("DELETE BY ID -> eliminar 1 producto por id",async ()=>{
        const response = await MiServidor().inject(
          {
            method: "DELETE",
            url: `/api/productos/${id_producto}`,
          }
        )
        expect(response.statusCode).toBe(200);
        expect(response.json().id_producto).toBe(id_producto)
        
      })






  
    })
