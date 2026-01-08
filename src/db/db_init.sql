create table productos (
id_producto UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
nombre_producto varchar(50),
precio_compra_producto NUMERIC,
precio_venta_producto NUMERIC

);

CREATE TABLE compras(
id_compra UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
fecha_compra DATE,
cantidad_compra NUMERIC,
id_foranea_producto UUID REFERENCES productos(id_producto)
)
;


Create table ventas (
id_venta UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
fecha_venta DATE,
id_foranea_producto UUID REFERENCES productos(id_producto),
cantidad_venta INTEGER,
precio_unitario_venta NUMERIC,
sub_total_venta NUMERIC GENERATED ALWAYS AS(cantidad_venta * precio_unitario_venta ) STORED ,
descuento_venta NUMERIC,
impuesto_venta NUMERIC GENERATED ALWAYS AS((((cantidad_venta * precio_unitario_venta )-descuento_venta)*0.15)) STORED ,
total_venta Numeric GENERATED ALWAYS AS ((cantidad_venta * precio_unitario_venta )-descuento_venta+(((cantidad_venta * precio_unitario_venta )-descuento_venta)*0.15)) STORED

)