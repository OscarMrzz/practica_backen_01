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


Reiniciar:
pm2 reload backend

## POSTGRES

reiniciar postgres:
sudo systemctl restart postgresql

Archivos de configuracion

- /etc/postgresql/14/main/postgresql.conf
    ** modifica lo siguiente **
    

    listen_addresses = 'localhost' por listen_addresses = '*'

- /etc/postgresql/14/main/pg_hba.conf
    ** modifica lo siguiente **
    agrega IP a las que daras permiso de conectarser, si es tu maquina local y el servidor pues tedras que colocar las iP de las dos
    host    all             all             127.0.0.1/32            scram-sha-256
   