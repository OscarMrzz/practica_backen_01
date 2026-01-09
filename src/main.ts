import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres'
import { productosRouter } from './app/productos/productos.router.js'
import  'dotenv'





const fastify = Fastify({ logger: true})

const dbConnectionString = process.env.db_connection_string || ''
if (!dbConnectionString){
    fastify.log.error('db_connection_string is not defined')
    
}
fastify.register(fastifyPostgres, {
    connectionString: dbConnectionString
})

fastify.get("/",async  (req,replay)=>{
    replay.send(
        {
            message:"Conexion exitosa"
        }
    )

}
)
fastify.register(productosRouter,{prefix:"/api/productos"})


const start = async ()=>{
    const  port = process.env.port || 3000
    fastify.listen({port:Number(port), host:'0.0.0.0'})
    fastify.log.info(`Server listening on port ${port}`)
}

start()
