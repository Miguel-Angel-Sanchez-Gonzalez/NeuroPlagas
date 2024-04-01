create database proyect_jwt;

use proyect_jwt;


create table login(
	username varchar(50) not null,
    password varchar(50) not null,
    primary key(username, password)
);

-- Inserción de un usuario de prueba
INSERT INTO login (username, password) VALUES ('zeti', '123');

-- Inserción de otro usuario de prueba
INSERT INTO login (username, password) VALUES ('abiu', '456');

-- Inserción de un usuario adicional
INSERT INTO login (username, password) VALUES ('migue', '1492');

SELECT * FROM login