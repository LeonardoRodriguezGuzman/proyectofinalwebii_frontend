CREATE DATABASE proyectofinalwebii;
USE proyectofinalwebii;

CREATE TABLE usuario(
	id INT(4) auto_increment,
	nombre VARCHAR(20) NOT NULL,
	contrasenia VARCHAR(30) NOT NULL,
	PRIMARY KEY(id) 
);

INSERT INTO usuarios VALUES(
	1,users'admin', '123456789'
);

ALTER TABLE usuario
RENAME COLUMN contrasenia TO clave;

DESCRIBE usuarios;
SELECT * FROM usuarios;
ALTER TABLE tabla_hija
ADD CONSTRAINT fk_componente
FOREIGN KEY (componente_id)
REFERENCES componentes(id)
ON DELETE CASCADE;