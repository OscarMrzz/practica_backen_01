import { MiServidor } from "./server.js";
import type { FastifyInstance } from "fastify";

/* PRUEBA 1 */
const start = async (servidor: FastifyInstance) => {
  const port = process.env.port || 3000;
  servidor.listen({ port: Number(port), host: "0.0.0.0" });
  servidor.log.info(`Server listening on port ${port}`);
};

start(MiServidor());