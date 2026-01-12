import "@fastify/postgres";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { productoModel } from "@/app/productos/productos.model.js";

export async function getAllProductos(
  req: FastifyRequest,
  replay: FastifyReply
) {
  try {
    const query = "SELECT * FROM productos";
    const { rows } = await req.server.pg.query<productoModel>(query);
    replay.send(rows);
  } catch (error) {
    replay.status(500).send({ error: "Error al obtener productos" });
  }
}

export async function getByIdProducto(
  req: FastifyRequest,
  replay: FastifyReply
) {
  try {
    const { id_producto } = req.params as { id_producto: string };
    const query = "SELECT * FROM productos WHERE id_producto=$1";
    const { rows } = await req.server.pg.query(query, [id_producto]);
    if (rows.length === 0) {
      replay.status(404).send({ error: "Producto no encontrado" });
    } else {
      replay.send(rows[0]);
    }
  } catch (error) {
    replay.status(500).send({ error: "Error al obtener producto" });
  }
}

export async function createProducto(  req: FastifyRequest,replay: FastifyReply) {
  try {
    const producto: Omit<productoModel, "id_producto" | "created_at_producto"> = req.body as Omit<productoModel, "id_producto" | "created_at_producto">;
    const query =
      "INSERT INTO productos (nombre_producto,precio_compra_producto,precio_venta_producto) VALUES ($1,$2,$3) RETURNING *";
    const { rows } = await req.server.pg.query(query, [
     
      producto.nombre_producto,
      producto.precio_compra_producto,
      producto.precio_venta_producto,
    ]);
    replay.status(201).send(rows[0]);
  } catch (error) {
    req.log.error(error);
    replay.status(500).send({ error: "Error al crear producto", details: error,body:req.body });
  }
}

export async function updateByIdProducto(
  req: FastifyRequest,
  replay: FastifyReply
) {
  try {
    const { id_producto } = req.params as { id_producto: string };
    const producto: Omit<productoModel, "id_producto" | "created_at_producto"> = req.body as Omit<productoModel, "id_producto" | "created_at_producto">;
    const query =
      "UPDATE productos SET nombre_producto=$1,precio_compra_producto=$2,precio_venta_producto=$3 WHERE id_producto=$4 RETURNING *";
    const { rows } = await req.server.pg.query(query, [
      producto.nombre_producto,
      producto.precio_compra_producto,
      producto.precio_venta_producto,
      id_producto,
    ]);
    if (rows.length === 0) {
      replay.status(404).send({ error: "Producto no encontrado" });
    } else {
      replay.send(rows[0]);
    }
  } catch (error) {
    replay.status(500).send({ error: "Error al actualizar producto" });
  }
}

export async function deleteByIdProducto(
  req: FastifyRequest,
  replay: FastifyReply
) {
  try {
    const { id_producto } = req.params as { id_producto: string };
    const query = "DELETE FROM productos WHERE id_producto=$1 RETURNING *";
    const { rows } = await req.server.pg.query(query, [id_producto]);
    if (rows.length === 0) {
      replay.status(404).send({ error: "Producto no encontrado" });
    } else {
      replay.send(rows[0]);
    }
  } catch (error) {
    replay.status(500).send({ error: "Error al eliminar producto" });
  }
}
