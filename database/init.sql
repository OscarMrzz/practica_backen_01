create table IF NOT EXISTS productos (
id_producto UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
nombre_producto varchar(50),
precio_compra_producto NUMERIC,
precio_venta_producto NUMERIC,
created_at_producto TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS compras(
id_compra UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
created_at_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fecha_compra DATE,
cantidad_compra NUMERIC,
id_foranea_producto UUID REFERENCES productos(id_producto),
precio_unitario_compra NUMERIC,
sub_total_compra NUMERIC GENERATED ALWAYS AS(cantidad_compra * precio_unitario_compra ) STORED,
descuento_compra NUMERIC DEFAULT 0,
impuesto_compra NUMERIC GENERATED ALWAYS AS(((cantidad_compra * precio_unitario_compra )-descuento_compra)*0.15) STORED,
total_compra Numeric GENERATED ALWAYS AS ((cantidad_compra * precio_unitario_compra )+(((cantidad_compra * precio_unitario_compra )-descuento_compra)*0.15)) STORED
);


Create table IF NOT EXISTS ventas (
id_venta UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
created_at_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fecha_venta DATE,
id_foranea_producto UUID REFERENCES productos(id_producto),
cantidad_venta INTEGER,
precio_unitario_venta NUMERIC,
sub_total_venta NUMERIC GENERATED ALWAYS AS(cantidad_venta * precio_unitario_venta ) STORED ,
descuento_venta NUMERIC,
impuesto_venta NUMERIC GENERATED ALWAYS AS((((cantidad_venta * precio_unitario_venta )-descuento_venta)*0.15)) STORED ,
total_venta Numeric GENERATED ALWAYS AS ((cantidad_venta * precio_unitario_venta )-descuento_venta+(((cantidad_venta * precio_unitario_venta )-descuento_venta)*0.15)) STORED

)