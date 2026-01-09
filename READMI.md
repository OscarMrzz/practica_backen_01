## Variables de entorno
crear .env con lo siguiente:
db_user=
db_password=
db_host=
db_port=
db_name=
db_connection_string=


## servidor
Levantarlo:
pm2 start dist/main.js --name "backend"

Cerrarlo:
pm2 stop backend

Levantarlo de nuevo:
pm2 start backend
