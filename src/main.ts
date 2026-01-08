import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres'
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


const start = async ()=>{
    const  port = process.env.port || 3000
    fastify.listen({port:Number(port)})
    fastify.log.info(`Server listening on port ${port}`)
}

start()
