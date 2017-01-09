CREATE SCHEMA IF NOT EXISTS `exam_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE exam_db;

DROP TABLE IF EXISTS `exam_db`.`evaluacion_detalle`;
DROP TABLE IF EXISTS `exam_db`.`evaluacion`;
DROP TABLE IF EXISTS `exam_db`.`usuario`;
DROP TABLE IF EXISTS `exam_db`.`examen`;
DROP TABLE IF EXISTS `exam_db`.`tema`;

/*CREACION*/
CREATE TABLE tema
(
id_tema INT(5) NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30) NOT NULL UNIQUE,
PRIMARY KEY (id_tema)
)ENGINE=InnoDB;

CREATE TABLE examen 
(
id_examen INT(5) NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30)  NOT NULL,
id_tema INT(5) NOT NULL,
examen_json TEXT,
porcentaje_aprobar FLOAT,
tiempo_minutos INT,
descripcion TEXT,
PRIMARY KEY (id_examen),
FOREIGN KEY (id_tema) REFERENCES tema (id_tema)
)ENGINE=InnoDB;

CREATE TABLE usuario 
(
id_usuario INT(5) NOT NULL AUTO_INCREMENT,
nif VARCHAR(9) NOT NULL UNIQUE,
nombre VARCHAR(30) NOT NULL,
apellido_1 VARCHAR(30) NOT NULL,
apellido_2 VARCHAR(30),
fecha_nacimiento DATE,
img_perfil VARCHAR(60),
login VARCHAR(60) UNIQUE,
password VARCHAR(30),
admin BOOLEAN,
PRIMARY KEY (id_usuario)
)ENGINE=InnoDB;

CREATE TABLE evaluacion
(
id_evaluacion INT(5) NOT NULL AUTO_INCREMENT,
id_examen INT(5) NOT NULL,
fecha_hora TIMESTAMP,
id_usuario INT(5) NOT NULL,
PRIMARY KEY (id_evaluacion),
FOREIGN KEY (id_examen) REFERENCES examen (id_examen),
FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
)ENGINE=InnoDB;

CREATE TABLE evaluacion_detalle
(
id_evaluacion_detalle INT(5) NOT NULL AUTO_INCREMENT,
resultados_json TEXT,
apto BOOLEAN,
nota FLOAT,
porcentaje_aciertos DOUBLE,
id_evaluacion INT(5) UNIQUE NOT NULL,
PRIMARY KEY (id_evaluacion_detalle),
FOREIGN KEY (id_evaluacion) REFERENCES evaluacion (id_evaluacion)
)ENGINE=InnoDB;

/*INSERTS*/
INSERT INTO tema VALUES (NULL, "Programación");
INSERT INTO tema VALUES (NULL, "Historia");
INSERT INTO tema VALUES (NULL, "Trivial");
INSERT INTO tema VALUES (NULL, "Matemáticas básicas");

INSERT INTO examen VALUES (NULL, "CSS",  1, '[{"id_pregunta":1,"enunciado":"¿Como se denomina el lenguaje de estilos para navegador?","respuestas":{"A":"CSS","B":"HTML","C":"Javascript","D":"XML","solucion":"A"}},{"id_pregunta":2,"enunciado":"¿Como definiriamos el software Brackets?","respuestas":{"A":"como un IDE","B":"como un editor de texto","C":"como lenguaje de programación","D":"como aparatos","solucion":"B"}},{"id_pregunta":3,"enunciado":"¿Donde se ejecuta el lenguaje PHP?","respuestas":{"A":"En le navegador","B":"En mi casa","C":"En el servidor de aplicaciones php","D":"En ninguna de las anteriores","solucion":"C"}},{"id_pregunta":4,"enunciado":"¿Las siglas HTML son de?","respuestas":{"A":"Lenguaje de Programación de Hipertexto","B":"Lenguaje de Marcas de Ropa","C":"HyperText Markdown Language","D":"Lenguaje de Marcas de Hipertexto","solucion":"D"}},{"id_pregunta":5,"enunciado":"¿Finalizaremos el proyecto a tiempo?","respuestas":{"A":"Puede","B":"No","C":"Hombre claro","D":"¿Que proyecto?","solucion":"C"}}]', 50, 10, 'Descripción examen CSS');
INSERT INTO examen VALUES (NULL, "Historia",  2, '[{"id_pregunta":1,"enunciado":"Uno de los principios más importantes de la Reforma predicada por Martín Lutero fue:","respuestas":{"A":"La eliminación de la práctica religiosa.","B":"El rechazo de la veneración de los santos.","C":"La reducción de los sacramentos.","D":"El reconocimiento de la Biblia como única fuente de la verdad religiosa.","solucion":"D"}},{"id_pregunta":2,"enunciado":"Navegando por el Canal de Beagle, ¿cuál será el medio técnico de orientación más preciso?","respuestas":{"A":"La observación de las estrellas.","B":"La inclinación de los árboles.","C":"El empleo de la brújula.","D":"La posición del sol.","solucion":"C"}},{"id_pregunta":3,"enunciado":"Los espacios verdes en una ciudad contribuyen al estado sanitario de la misma. ¿Cuál de las siguientes expresiones sintetiza mejor su importancia para la salud pública?","respuestas":{"A":"El verde de la vegetación es un descanso para la vista.","B":"Los parques son los pulmones de la ciudad.","C":"Los árboles hacen más agradable la temperatura.","D":"El contacto con la vegetación ayuda a relajarse.","solucion":"B"}},{"id_pregunta":4,"enunciado":"Los espartanos se caracterizaron principalmente:","respuestas":{"A":"Por su espíritu guerrero.","B":"Porque las mujeres recibían educación física.","C":"Porque disponían de un gran número de ilotas.","D":"Por haber creado la institución de los éforos.","solucion":"A"}},{"id_pregunta":5,"enunciado":"¿Cuál de los siguientes edificios es más alto?","respuestas":{"A":"Empire State Building","B":"New World Trade Center","C":"Torre Agbar","D":"Burj Khalifa","solucion":"D"}},{"id_pregunta":6,"enunciado":"¿Cuál de los siguientes autores es literato español?  ","respuestas":{"A":"Los hermanos Álvarez Quintero.","B":"Mariano de Vedia y Mitre.","C":"Victoria Ocampo.","D":"Rómulo Gallegos.","solucion":"A"}}]', 50, 15, 'Descripción examen Historia');                           
INSERT INTO examen VALUES (NULL, "Preguntas básicas",  3, '[{"id_pregunta":1,"enunciado":"¿Cuál de las siguientes empresas se fundó antes?","respuestas":{"A":"McDonald''s","B":"Burger King","C":"Apple","D":"Microsoft","solucion":"B"}},{"id_pregunta":2,"enunciado":"De los siguientes artistas marciales, ¿cuál no nació en China?","respuestas":{"A":"Bruce Lee","B":"Jackie Chan","C":"Jet Lee","D":"Sasaki Kojiro","solucion":"D"}},{"id_pregunta":3,"enunciado":"Cuál de las siguientes montañas es más alta?","respuestas":{"A":"Mont Blanc","B":"Mauna Kea","C":"El Matterhorn","D":"Kilimanjaro","solucion":"D"}},{"id_pregunta":4,"enunciado":"¿Cuál es el río más caudaloso del mundo?","respuestas":{"A":"Amazonas","B":"Nilo","C":"Yangtsé","D":"Misisipi","solucion":"A"}},{"id_pregunta":5,"enunciado":"¿Cuál de los siguientes mamíferos es más grande?","respuestas":{"A":"Oso polar","B":"Tigre de bengala","C":"Morsa","D":"Alce","solucion":"C"}},{"id_pregunta":6,"enunciado":"Barack Obama es:","respuestas":{"A":"El presidente de los Estados Unidos","B":"El ex-presidente de los Estados Unidos","C":"El nombre de una especie de parásito","D":"B y C","solucion":"D"}}]', 60, 30, 'Descripción examen Preguntas Básicas');
INSERT INTO examen VALUES (NULL, "Aritmética para niños",  4, '[{"id_pregunta":1,"enunciado":"Cuántos divisores tiene el número 12?","respuestas":{"A":"1","B":"12","C":"6","D":"4","solucion":"C"}},{"id_pregunta":2,"enunciado":"¿Qué afirmación es incorrecta?","respuestas":{"A":"La suma de dos números pares es par","B":"La suma de dos números impares es par","C":"El producto de dos números impares es par","D":"La tabla del 2 no tiene productos impares","solucion":"C"}},{"id_pregunta":3,"enunciado":"¿Cuál es el producto del cuadrado de 5 por el cuadrado de 2?","respuestas":{"A":"10","B":"100","C":"50","D":"27","solucion":"B"}},{"id_pregunta":4,"enunciado":"El residuo de una división es:","respuestas":{"A":"Lo que sobra para que la división fuera exacta","B":"Algo que no se sabe lo que es","C":"Lo que daría la parte decimal del resultado","D":"A y C","solucion":"D"}},{"id_pregunta":5,"enunciado":"¿Cuál es el máximo común divisor de 12 y 36?","respuestas":{"A":"6","B":"4","C":"1","D":"12","solucion":"D"}},{"id_pregunta":6,"enunciado":"¿Cuánto es el cuadrado de x menos el cuadrado de x-1?  ","respuestas":{"A":"0","B":"2x-1","C":"1","D":"x","solucion":"B"}}]', 50, 30, 'Descripción examen Aritmética para niños');


INSERT INTO usuario VALUES (NULL, "11223344A","Carlos", "Cabot", NULL, "1988-07-28", "rickroll.jpg", "carloscabotdp@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344B", "Irene", "Giró", NULL, "1991-05-12", "wonder.png", "irene.giroparadell@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344C","Antony", "Medina", NULL, "1991-05-12", "gates.jpg","iantony.01.1991@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344D", "Stanka", "Asenova", NULL, "1991-05-12", "wonder.png", "ctahka@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344E", "Daniel", "Colomer", NULL, "1991-05-12", "gates.jpg", "colomertrave@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344F", "Daniel", "Sanchez", NULL, "1991-05-12", "gates.jpg", "dsbdn21@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344G", "Samuel", "Allasia", NULL, "1991-05-12", "gates.jpg", "samuelallasia@gmail.com", "12345", false );
INSERT INTO usuario VALUES (NULL, "11223344X","Super", "Admin", NULL, "1988-07-28", "nemo.png", "admin@gmail.com", "12345", true );

INSERT INTO evaluacion VALUES (NULL, 1, "2016-12-19 23:59:59", 1);
INSERT INTO evaluacion VALUES (NULL, 1, "2016-12-18 23:59:59", 2);
INSERT INTO evaluacion VALUES (NULL, 2, "2016-12-15 22:59:59", 3);
INSERT INTO evaluacion VALUES (NULL, 3, "2016-12-16 21:59:59", 4);
INSERT INTO evaluacion VALUES (NULL, 3, "2016-12-13 10:59:59", 5);
INSERT INTO evaluacion VALUES (NULL, 4, "2016-12-15 09:59:59", 6);
INSERT INTO evaluacion VALUES (NULL, 4, "2016-12-14 13:59:59", 7);

INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"C"}]', true, 10, 100, 1);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"A"}]', true, 8, 80, 2);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"C"},{"id_pregunta":5,"respuesta":"A"]}', true, 6, 60, 3);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"A"}]', true, 8, 80, 4);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"A"}]', true, 8, 80, 5);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"A"}]', true, 8, 80, 6);
INSERT INTO evaluacion_detalle VALUES (NULL, '[{"id_pregunta":1,"respuesta":"A"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"D"},{"id_pregunta":5,"respuesta":"A"}]', true, 8, 80, 7);

/*DESCRIBE*/
DESCRIBE tema;
DESCRIBE examen;
DESCRIBE evaluacion;
DESCRIBE evaluacion_detalle;
DESCRIBE usuario;

/*SELECT*/
SELECT * FROM tema ORDER BY id_tema;
SELECT * FROM examen ORDER BY id_examen;
SELECT * FROM evaluacion;
SELECT * FROM evaluacion_detalle;
SELECT * FROM usuario;

SELECT u.nombre, ex.nombre, ev.fecha_hora, ev_det.nota From usuario AS u, examen AS ex, evaluacion AS ev, evaluacion_detalle AS ev_det WHERE u.id_usuario = ev.id_usuario AND ex.id_examen = ev.id_examen AND ev.id_evaluacion = ev_det.id_evaluacion_detalle;
