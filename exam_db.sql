CREATE SCHEMA IF NOT EXISTS `exam_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE exam_db;

DROP TABLE IF EXISTS `exam_db`.`Evaluacion_detalle`;
DROP TABLE IF EXISTS `exam_db`.`Evaluacion`;
DROP TABLE IF EXISTS `exam_db`.`Usuario`;
DROP TABLE IF EXISTS `exam_db`.`Examen`;
DROP TABLE IF EXISTS `exam_db`.`Tema`;

/*CREACION*/
CREATE TABLE Tema
(
idTema INT(5) NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30) NOT NULL UNIQUE,
PRIMARY KEY (idTema)
)ENGINE=InnoDB;

CREATE TABLE Examen 
(
idExamen INT(5) NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30)  NOT NULL,
idTema INT(5) NOT NULL,
examen_json TEXT,
porcentaje_aprovar FLOAT,
tiempo_minutos INT,
PRIMARY KEY (idExamen),
FOREIGN KEY (idTema) REFERENCES Tema (idTema)
)ENGINE=InnoDB;

CREATE TABLE Usuario 
(
idUsuario INT(5) NOT NULL AUTO_INCREMENT,
nif VARCHAR(9) NOT NULL UNIQUE
nombre VARCHAR(30) NOT NULL,
apellido_1 VARCHAR(30) NOT NULL,
apellido_2 VARCHAR(30),
fecha_nacimiento DATE,
login VARCHAR(60) UNIQUE,
passwd VARCHAR(30),
admin BOOLEAN,
PRIMARY KEY (idUsuario)
)ENGINE=InnoDB;

CREATE TABLE Evaluacion
(
idEvaluacion INT(5) NOT NULL AUTO_INCREMENT,
idExamen INT(5) NOT NULL,
fecha_hora TIMESTAMP,
idUsuario INT(5) NOT NULL,
PRIMARY KEY (idEvaluacion),
FOREIGN KEY (idExamen) REFERENCES Examen (idExamen),
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario)
)ENGINE=InnoDB;

CREATE TABLE Evaluacion_detalle
(
idEvDetalle INT(5) NOT NULL AUTO_INCREMENT,
resultados_json TEXT,
apto BOOLEAN,
nota FLOAT,
porcentaje_aciertos DOUBLE,
idEvaluacion INT(5)  NOT NULL,
PRIMARY KEY (idEvDetalle),
FOREIGN KEY (idEvaluacion) REFERENCES Evaluacion (idEvaluacion)
)ENGINE=InnoDB;

/*INSERTS*/
INSERT INTO Tema (idTema, nombre) VALUES (NULL, "Programación");
INSERT INTO Tema VALUES (NULL, "Historia");
INSERT INTO Tema VALUES (NULL, "Trivial");
INSERT INTO Tema VALUES (NULL, "Matemáticas básicas");

INSERT INTO Examen (idExamen, nombre, idTema, examen_json, porcentaje_aprovar, tiempo_minutos) VALUES (NULL, "CSS",  1, '{"Preguntas":[{"idpregunta":1,"enunciado":"¿Como se denomina el lenguaje de estilos para navegador?","respuestas":{"A":"CSS","B":"HTML","C":"Javascript","D":"XML","solucion":"A"}},{"idpregunta":2,"enunciado":"¿Como definiriamos el software Brackets?","respuestas":{"A":"como un IDE","B":"como un editor de texto","C":"como lenguaje de programación","D":"como aparatos","solucion":"B"}},{"idpregunta":3,"enunciado":"¿Donde se ejecuta el lenguaje PHP?","respuestas":{"A":"En le navegador","B":"En mi casa","C":"En el servidor de aplicaciones php","D":"En ninguna de las anteriores","solucion":"C"}},{"idpregunta":4,"enunciado":"¿Las siglas HTML son de?","respuestas":{"A":"Lenguaje de Programación de Hipertexto","B":"Lenguaje de Marcas de Ropa","C":"HyperText Markdown Language","D":"Lenguaje de Marcas de Hipertexto","solucion":"D"}},{"idpregunta":5,"enunciado":"¿Finalizaremos el proyecto a tiempo?","respuestas":{"A":"Puede","B":"No","C":"Hombre claro","D":"¿Que proyecto?","solucion":"C"}}]}', 50, 10);
INSERT INTO Examen VALUES (NULL, "Historia",  2, '{"Preguntas":[{"idpregunta":1,"enunciado":"Uno de los principios más importantes de la Reforma predicada por Martín Lutero fue:","respuestas":{"A":"La eliminación de la práctica religiosa.","B":"El rechazo de la veneración de los santos.","C":"La reducción de los sacramentos.","D":"El reconocimiento de la Biblia como única fuente de la verdad religiosa.","solucion":"D"}},{"idpregunta":2,"enunciado":"Navegando por el Canal de Beagle, ¿cuál será el medio técnico de orientación más preciso?","respuestas":{"A":"La observación de las estrellas.","B":"La inclinación de los árboles.","C":"El empleo de la brújula.","D":"La posición del sol.","solucion":"C"}},{"idpregunta":3,"enunciado":"Los espacios verdes en una ciudad contribuyen al estado sanitario de la misma. ¿Cuál de las siguientes expresiones sintetiza mejor su importancia para la salud pública?","respuestas":{"A":"El verde de la vegetación es un descanso para la vista.","B":"Los parques son los pulmones de la ciudad.","C":"Los árboles hacen más agradable la temperatura.","D":"El contacto con la vegetación ayuda a relajarse.","solucion":"B"}},{"idpregunta":4,"enunciado":"Los espartanos se caracterizaron principalmente:","respuestas":{"A":"Por su espíritu guerrero.","B":"Porque las mujeres recibían educación física.","C":"Porque disponían de un gran número de ilotas.","D":"Por haber creado la institución de los éforos.","solucion":"A"}},{"idpregunta":5,"enunciado":"¿Cuál de los siguientes edificios es más alto?","respuestas":{"A":"Empire State Building","B":"New World Trade Center","C":"Torre Agbar","D":"Burj Khalifa","solucion":"D"}},{"idpregunta":6,"enunciado":"¿Cuál de los siguientes autores es literato español?  ","respuestas":{"A":"Los hermanos Álvarez Quintero.","B":"Mariano de Vedia y Mitre.","C":"Victoria Ocampo.","D":"Rómulo Gallegos.","solucion":"A"}}]}', 50, 15);                           
INSERT INTO Examen VALUES (NULL, "Preguntas básicas",  3, '{"Preguntas":[{"idpregunta":1,"enunciado":"¿Cuál de las siguientes empresas se fundó antes?","respuestas":{"A":"McDonald''s","B":"Burger King","C":"Apple","D":"Microsoft","solucion":"B"}},{"idpregunta":2,"enunciado":"De los siguientes artistas marciales, ¿cuál no nació en China?","respuestas":{"A":"Bruce Lee","B":"Jackie Chan","C":"Jet Lee","D":"Sasaki Kojiro","solucion":"D"}},{"idpregunta":3,"enunciado":"Cuál de las siguientes montañas es más alta?","respuestas":{"A":"Mont Blanc","B":"Mauna Kea","C":"El Matterhorn","D":"Kilimanjaro","solucion":"D"}},{"idpregunta":4,"enunciado":"¿Cuál es el río más caudaloso del mundo?","respuestas":{"A":"Amazonas","B":"Nilo","C":"Yangtsé","D":"Misisipi","solucion":"A"}},{"idpregunta":5,"enunciado":"¿Cuál de los siguientes mamíferos es más grande?","respuestas":{"A":"Oso polar","B":"Tigre de bengala","C":"Morsa","D":"Alce","solucion":"C"}},{"idpregunta":6,"enunciado":"Barack Obama es:","respuestas":{"A":"El presidente de los Estados Unidos","B":"El ex-presidente de los Estados Unidos","C":"El nombre de una especie de parásito","D":"B y C","solucion":"D"}}]}', 60, 30);
INSERT INTO Examen VALUES (NULL, "Aritmética para niños",  4, '{"Preguntas":[{"idpregunta":1,"enunciado":"Cuántos divisores tiene el número 12?","respuestas":{"A":"1","B":"12","C":"6","D":"4","solucion":"C"}},{"idpregunta":2,"enunciado":"¿Qué afirmación es incorrecta?","respuestas":{"A":"La suma de dos números pares es par","B":"La suma de dos números impares es par","C":"El producto de dos números impares es par","D":"La tabla del 2 no tiene productos impares","solucion":"C"}},{"idpregunta":3,"enunciado":"¿Cuál es el producto del cuadrado de 5 por el cuadrado de 2?","respuestas":{"A":"10","B":"100","C":"50","D":"27","solucion":"B"}},{"idpregunta":4,"enunciado":"El residuo de una división es:","respuestas":{"A":"Lo que sobra para que la división fuera exacta","B":"Algo que no se sabe lo que es","C":"Lo que daría la parte decimal del resultado","D":"A y C","solucion":"D"}},{"idpregunta":5,"enunciado":"¿Cuál es el máximo común divisor de 12 y 36?","respuestas":{"A":"6","B":"4","C":"1","D":"12","solucion":"D"}},{"idpregunta":6,"enunciado":"¿Cuánto es el cuadrado de x menos el cuadrado de x-1?  ","respuestas":{"A":"0","B":"2x-1","C":"1","D":"x","solucion":"B"}}]}', 50, 30);

INSERT INTO Usuario (idUsuario, nif, nombre, apellido_1, apellido_2, fecha_nacimiento, login, passwd, admin)
VALUES (NULL, "11223344A","Carlos", "Cabot", NULL, "1988-07-28", "carloscabotdp@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL,"11223344B", "Irene", "Giró", NULL, "1991-05-12", "irene.giroparadell@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL, "11223344C","Antony", "Medina", NULL, "1991-05-12", "iantony.01.1991@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL, "11223344D", "Stanka", "Asenova", NULL, "1991-05-12", "ctahka@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL, "11223344E", "Daniel", "Colomer", NULL, "1991-05-12", "colomertrave@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL, "11223344F", "Daniel", "Sanchez", NULL, "1991-05-12", "dsbdn21@gmail.com", "12345", false );
INSERT INTO Usuario VALUES (NULL, "11223344G", "Samuel", "Allasia", NULL, "1991-05-12", "samuelallasia@gmail.com", "12345", false );

INSERT INTO Evaluacion (idEvaluacion, idExamen, fecha_hora, idUsuario) VALUES (NULL, 1, "2016-12-19 23:59:59", 1);
INSERT INTO Evaluacion VALUES (NULL, 1, "2016-12-18 23:59:59", 2);
INSERT INTO Evaluacion VALUES (NULL, 2, "2016-12-15 22:59:59", 3);
INSERT INTO Evaluacion VALUES (NULL, 3, "2016-12-16 21:59:59", 4);
INSERT INTO Evaluacion VALUES (NULL, 3, "2016-12-13 10:59:59", 5);
INSERT INTO Evaluacion VALUES (NULL, 4, "2016-12-15 09:59:59", 6);
INSERT INTO Evaluacion VALUES (NULL, 4, "2016-12-14 13:59:59", 7);

INSERT INTO Evaluacion_detalle (idEvDetalle, resultados_json, apto, nota, porcentaje_aciertos, idEvaluacion) VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"C"}]}', true, 10, 100, 1);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"A"}]}', true, 8, 80, 2);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"C"},{"idpregunta":5,"resupesta":"A"}]}', true, 6, 60, 3);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"A"}]}', true, 8, 80, 4);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"A"}]}', true, 8, 80, 5);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"A"}]}', true, 8, 80, 6);
INSERT INTO Evaluacion_detalle VALUES (NULL, '{"Respuestas":[{"idpregunta":1,"resupesta":"A"},{"idpregunta":2,"resupesta":"B"},{"idpregunta":3,"resupesta":"C"},{"idpregunta":4,"resupesta":"D"},{"idpregunta":5,"resupesta":"A"}]}', true, 8, 80, 7);

/*DESCRIBE*/
DESCRIBE Tema;
DESCRIBE Examen;
DESCRIBE Evaluacion;
DESCRIBE Evaluacion_detalle;
DESCRIBE Usuario;

/*SELECT*/
SELECT * FROM Tema ORDER BY idTema;
SELECT * FROM Examen ORDER BY idExamen;
SELECT * FROM Evaluacion;
SELECT * FROM Evaluacion_detalle;
SELECT * FROM Usuario;

SELECT u.nombre, ex.nombre, ev.fecha_hora, ev_det.nota From Usuario AS u, Examen AS ex, Evaluacion AS ev, Evaluacion_detalle AS ev_det WHERE u.idUsuario = ev.idUsuario AND ex.idExamen = ev.idExamen AND ev.idEvaluacion = ev_det.idEvDetalle;
