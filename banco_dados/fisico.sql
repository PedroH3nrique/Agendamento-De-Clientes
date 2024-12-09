-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE Usuarios (
pk_cod_usu INTEGER PRIMARY KEY,
senha_usu VARCHAR(8),
nome_usu VARCHAR(20),
fk_cod_agen_uso INTEGER
)

CREATE TABLE Agendamentos (
pk_cod_agen INTEGER PRIMARY KEY,
data_agen DATETIME
)

ALTER TABLE Usuarios ADD FOREIGN KEY(fk_cod_agen_uso) REFERENCES Agendamentos (pk_cod_agen)
