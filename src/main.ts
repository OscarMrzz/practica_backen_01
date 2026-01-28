import { MiServidor } from "./server.js";
import type { FastifyInstance } from "fastify";

/* prueba de CI/CD 9 */
const start = async (servidor: FastifyInstance) => {
  const port = process.env.PORT || 3000;
  servidor.listen({ port: Number(port), host: "0.0.0.0" });
  servidor.log.info(`Server listening on port ${port}`);
};

start(MiServidor());