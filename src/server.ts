import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { productosRouter } from "./app/productos/productos.router.js";
import dotenv from "dotenv";
dotenv.config();

export function MiServidor(){

const fastify = Fastify({ logger: true });

const dbConnectionString = process.env.DB_CONNECTION_STRING || "";
if (!dbConnectionString) {
  fastify.log.error("DB_CONNECTION_STRING is not defined");
}
fastify.register(fastifyPostgres, {
  connectionString: dbConnectionString,
});

fastify.get("/", async (req, replay) => {
  try {
    const query = "SELECT current_timestamp;";
    const { rows } = await fastify.pg.query(query);

      replay.send({conexionBackend:"OK",conexionDB:"OK",timestamp:rows[0].current_timestamp,version:"1.0.1"});
  } catch (error) {
    fastify.log.error(error);
    replay.status(500).send({conexionBackend:"OK",conexionDB:"error",error: (error as any)?.message || String(error)});
  }
});

fastify.register(productosRouter, { prefix: "/api/productos" });

return fastify;

}