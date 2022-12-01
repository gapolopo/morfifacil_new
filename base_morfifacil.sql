-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.36 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para morfifacil
CREATE DATABASE IF NOT EXISTS `morfifacil` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `morfifacil`;

-- Volcando estructura para tabla morfifacil.calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `ID_REC` bigint(20) NOT NULL,
  `COMIDA` int(11) NOT NULL COMMENT '0 desayuno, 1 almuerzo, 2 merianda, 3 cena',
  `FECHA_COMIDA` datetime NOT NULL,
  `FECHA_CARGA` datetime NOT NULL,
  `USUARIO_CARGA` bigint(20) NOT NULL,
  KEY `FK__recetas` (`ID_REC`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Calendario con las recetas por semana';

-- Volcando datos para la tabla morfifacil.calendario: 0 rows
/*!40000 ALTER TABLE `calendario` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendario` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `ID_REC` bigint(20) NOT NULL,
  `SABROCIDAD` int(11) DEFAULT '5',
  `FACILIDAD` int(11) DEFAULT '5',
  KEY `FK__recetas` (`ID_REC`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Guarda los comentarios sobre cada receta realizada';

-- Volcando datos para la tabla morfifacil.comentarios: 0 rows
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.compras
CREATE TABLE IF NOT EXISTS `compras` (
  `id_cpra` bigint(20) NOT NULL AUTO_INCREMENT,
  `item` varchar(150) CHARACTER SET latin1 NOT NULL,
  `cantidad` int(11) NOT NULL,
  `medida` varchar(10) NOT NULL,
  `nota` text CHARACTER SET latin1,
  `status` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cpra`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='Lista de compras a realizar';

-- Volcando datos para la tabla morfifacil.compras: 10 rows
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` (`id_cpra`, `item`, `cantidad`, `medida`, `nota`, `status`, `fecha`, `usuario`) VALUES
	(1, 'papas', 2, 'kg', 'blancas', 'comprado', '2022-11-20 09:48:41', 'galo'),
	(2, 'arvejas', 5, 'unidades', 'al natural', 'comprado', '2022-11-20 09:49:37', 'galo'),
	(3, 'milanesas de pollo', 3, 'kilogramos', 'de pata muslo', 'eliminado', '2022-11-21 00:01:37', 'Galo Ruy Budiño'),
	(4, 'carne picada', 2, 'kilogramos', '', 'comprado', '2022-11-21 00:04:29', 'Galo Ruy Budiño'),
	(5, 'pure de tomate', 2, 'litros', 'sin piel', 'comprado', '2022-11-21 00:17:13', 'Galo Ruy Budiño'),
	(6, 'leche', 4, 'unidades', 'comun', 'eliminado', '2022-11-21 00:18:14', 'Galo Ruy Budiño'),
	(7, 'pure de tomate', 2, 'unidades', '', 'eliminado', '2022-11-21 12:44:46', 'Galo Ruy Budiño'),
	(8, 'carne picada', 3, 'kilogramos', 'fina', 'comprado', '2022-11-21 12:45:00', 'Galo Ruy Budiño'),
	(9, 'milanesas de pollo', 2, 'kilogramos', 'adasdasd', 'eliminado', '2022-11-21 12:48:35', 'Galo Ruy Budiño'),
	(10, 'pure de tomate', 2, 'litros', 'sfsfsd', 'comprado', '2022-11-21 12:48:50', 'Galo Ruy Budiño'),
	(11, 'leche', 4, 'unidades', 'descremada', 'eliminado', '2022-11-30 22:48:56', 'Inti Nahuel Budiño'),
	(12, 'carne picada', 2, 'kilogramos', 'especial', 'comprado', '2022-11-30 22:49:34', 'Inti Nahuel Budiño');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.consultas
CREATE TABLE IF NOT EXISTS `consultas` (
  `id_com` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `mail` varchar(250) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `consulta` text NOT NULL,
  PRIMARY KEY (`id_com`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Tabla para realizar consultas a los referentes';

-- Volcando datos para la tabla morfifacil.consultas: 6 rows
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
INSERT INTO `consultas` (`id_com`, `nombre`, `mail`, `tipo`, `consulta`) VALUES
	(1, 'dada', 'dsadas@dadads.com', 'Soporte', 'ayuda'),
	(2, 'Galo Ruy', 'galoruy@gmail.com', 'Soporte', 'Podrías ayudarme? tengo un problema cuando quiero acceder a la pagina de administración. soy perfil cocinero y no me deja ingresar.'),
	(3, 'Galo Ruy', 'rudipaz@gmail.com', 'Mejora', 'fsdfdf'),
	(4, 'Jose peralta', 'josepe@gmail.com', 'Soporte', 'No me funciona la carga de recetas, da error 404. gracias'),
	(5, 'Jose Gomes', 'joseGomes@gmail.com', 'Mejora', 'Se puede poner fotos de las recetas?'),
	(6, 'Gaston Hortas', 'ghortas@gmail.com', 'Soporte', 'Problema para soporte'),
	(7, 'Jose Pepe', 'jose@gmail.com', 'Mejora', 'Agregar un texto de la consulta'),
	(8, 'Rodolfo Vargas', 'rodolfo@gmail.com', 'Mejora', 'Agregar fotos a las compras');
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.imagenes
CREATE TABLE IF NOT EXISTS `imagenes` (
  `ID_REC` bigint(20) NOT NULL,
  `ID_IMAGEN` bigint(20) NOT NULL AUTO_INCREMENT,
  `IMAGEN` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID_REC`,`ID_IMAGEN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Guarda las imagenes de las recetas';

-- Volcando datos para la tabla morfifacil.imagenes: 0 rows
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.recetas
CREATE TABLE IF NOT EXISTS `recetas` (
  `id_rec` bigint(20) NOT NULL AUTO_INCREMENT,
  `receta` text NOT NULL,
  `denominacion` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_img` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_rec`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='Guarda la colección de recetas';

-- Volcando datos para la tabla morfifacil.recetas: 7 rows
/*!40000 ALTER TABLE `recetas` DISABLE KEYS */;
INSERT INTO `recetas` (`id_rec`, `receta`, `denominacion`, `fecha`, `id_img`) VALUES
	(21, 'aca va la receta con sus ingredientes', 'Ñoquis', '2022-11-30 22:46:24', 'urkjod1v29tmrswwmk8v'),
	(3, 'receta de Guiso de lentejas', 'Guiso de Lentejas', '2022-11-19 11:43:48', NULL),
	(17, 'Ingredientes\r\n\r\nsalen unas 4 porciones de ñoquis\r\n\r\n1 kg de papa\r\n\r\n300 gr de harina 0000\r\n\r\n1 huevo\r\n\r\nsal y pimienta\r\n\r\n\r\nReceta de ñoquis de papa paso a paso\r\nlos clásicos del 29\r\nLo primero que vamos a hacer lavar bien las papas ya que las vamos a hervir con cáscara. Esto es muy importante para que luego los ñoquis de papa no se desarmen, ya que al cocerlas con cáscara evitamos que absorban agua en exceso. Hacemos un corte horizontal por todo el contorno de la papa, en el video se ve bien, y las llevamos a una olla con agua. Cocinar hasta que al pincharlas se caigan.\r\nLas retiramos y las dejamos enfriar sólo para no quemarnos. Con el corte que hicimos, la cáscara tiene que salir muy fácil en dos partes.\r\nPisamos las papas todavía en caliente como todo puré digno, agregamos sal, pimienta y mezclamos super bien. Agregamos el huevo batido y la harina. No le vamos a agregar toda la harina de una, nos vamos a guardar un poco para ver cómo viene. Las cantidades son más bien proporcionales, puede ser que la papa haya absorbido más agua o que el huevo sea más chico, así que vamos a agregar la harina de a poco.\r\nUnir con la mano hasta que se pueda pasar hasta la mesada y terminar de integrar. Si en este paso ven que hace falta más harina, tenemos el resto para agregar. No es necesario amar mucho, la idea es llegar a una masa unida y uniforme sin tocarla mucho.\r\nCortar tiras de masa y hacer chorricitos o rollitos, y cortar trocitos de unos 2 o 3 cm de ancho, pueden enharinar el cuchillo para que sea más fácil.\r\nAhora viene la magia, vamos a pasarlos por la herramienta para darle forma a los ñoquis de papa de arriba hacia abajo. También pueden usar un tenedor enharinado que también les deja una forma similar. Colocarlos en una placa enharinada sin que se toquen para que no se pegoteen. Y claro, también pueden hacerlos sin la herramienta y simplemente que queden en su versión más rústica.\r\nPara la cocción, llevar de a tandas a una olla con agua hirviendo con sal. Van a ver que se caen al fondo. Cuando suben, los dejan 1 minuto y ya están listos!', 'ñoquis de papa', '2022-11-29 21:09:40', 'hl6mlk0b2godemw2ubfw'),
	(16, 'Ingredientes\r\n350 gr de carne (puede ser nalga, cuadrada, cuadril…)\r\n250 gr de arroz\r\n1 chorizo\r\n1 cebolla mediana\r\n1 pimiento morrón rojo mediano\r\n2 dientes de ajo\r\n1 zanahoria\r\n1 lata de puré de tomates o 3 tomates triturados\r\nLaurel, pimentón, orégano, tomillo\r\nSal\r\nPimienta\r\nAceite de oliva\r\nAgua o caldo, cantidad necesaria\r\nComo hacer guiso de arroz tradicional\r\nCortar las verduras bien pequeñas, la carne en cubos y desgrasar el chorizo (puede ser hirviéndolo o en una sartén directamente)\r\nEn una olla colocar un chorrito de aceite de oliva y sumar los ajos, llevar a fuego y cuando esté bien caliente sumar los cubos de carne. Dorar por todas las caras de la carne.\r\nSumar las verduras y bajar un poco el fuego, cuando estén transparentes agregar el chorizo en fetas finas y dejar que todo se incorpore bien.\r\nAgregar el puré de tomates, condimentar y agregarle el laurel y las hierbas a gusto. Una vez que la salsa cambie de color (unos minutos después, se pone de un tono más bordó) agregarle 2 tazas de agua. Pueden usar caldo si prefieren, o sumarle un caldito saborizante al agua.\r\nCuando hierva sumar el arroz y lo cocinamos normalmente. Utilizar el fuego a mínimo así no se pega.\r\nCocinar hasta que el caldo se consuma casi completamente. En este punto el arroz estará al dente, así que si así es como les gusta ya se retira del fuego. En el caso de que prefieran el arroz bien blandito e integrado a la salsa, agregar un poco más de agua o caldo y cocinar con tapa hasta que tenga el punto deseado.\r\nUna vez cocinado, dejar reposar unos minutos y emplatar. Se puede servir con un poco de ciboulette o perejil esparcido por arriba y un buen pancito para acompañar!', 'Guiso de Arroz', '2022-11-29 16:18:34', 'bobckizuozwkpgmkqjmq'),
	(18, 'Ingredientes\r\n\r\n 1 kilo/s de Harina 0000\r\n\r\n 650 centímetros cúbicos de Agua tibia\r\n\r\n 40 gramo/s de Levadura fresca\r\n\r\n 1 cucharadita/s de Azúcar\r\n\r\n 2 cucharadita/s de Sal\r\n\r\n 4 cucharada/s de Aceite de Oliva\r\n\r\n 2 lata/s de Tomates al natural\r\n\r\n 300 gramo/s de Mozzarella\r\n\r\nAgregar a la lista\r\nPreparación\r\n-Desmenuzar la levadura y la disolviar en el agua tibia.\r\n\r\n-Colocar la harina en forma de corona sobre una mesa de madera y echar en el centro, de a poco, el agua con la levadura diluida. Unir la masa, agregó el aceite de oliva y la sal y amasar hasta obtener un bollo bien elástico.\r\n\r\n-Colocar en un bowl y tapar con un repasador dejándolo leudar durante 30 minutos, hasta que duplicó su volumen.\r\n\r\n-Pasado ese tiempo, cortar cuatro trozos, estirar en pizzeras aceitadas y dejar leudar 30 minutos más. Recién entonces cocinar a temperatura alta y pareja durante 20 minutos.\r\n\r\n-Entretanto preparar 2 latas de tomate picado que sazonó con aceite de oliva, sal y orégano y extender sobre las pizzas. Colocar por encima de cada una media taza de mozzarella picada y darle un golpe de horno hasta que quede dorada y crocante.', 'Pizza de Muzzarella', '2022-11-29 21:23:57', 'ph9ydguiqnoz9bqzkspb'),
	(19, 'Ingredientes\r\nSobre las porciones de esta receta de locro les digo: es para 6-8 personas y es lo MÍNIMO que podés hacer por éste motivo: lleva tantos tipos de carne y tal que no podés hacer menos que esto. En mi caso, lo congelo y lo como días más tarde.\r\n\r\n250g. de porotos blancos\r\n250g. de maíz blanco partido\r\n1 chorizo colorado\r\n1 chorizo criollo\r\nCuerito de cerdo\r\nPechito de cerdo\r\nFalda\r\n200g. de panceta\r\n3 cebollas\r\n2 cebollas de verdeo\r\n1 puerro\r\n1/2 calabaza\r\n1/2 morrón rojo (para la salsita)\r\nCondimentos: sal, pimienta, comino, pimentón, ají molido, orégano\r\n\r\nReceta de Locro Argentino paso a paso\r\nPreparar todos los ingredientes para el locro. Las carnes cortalas como te indico en el video (en trozos pequeños), las verduras en rodajas bien bien finitas, la calabaza en cubos y una parte rallada y los porotos y el maíz remojados desde la noche anterior.\r\nDesgrasar el chorizo y el cuerito en una olla y el chorizo colorado en otra. Lo ponés al fuego y lo dejás hervir 10 minutos o 15. Tanto el chorizo como el chorizo colorado podés desgrasarlos enteros, sin cortar.\r\nLocro blanco: poner en una olla al fuego la panceta, lsa carnes, y el chorizo ya ccocido, y dejar hasta que largue parte de su grasa. Agregar aceite de oliva si hace falta y saltear ahí la cebolla, el puerro y la cebolla de verdeo hasta que estén blandas. Una vez que ya está agregar el maíz y los porotos y cubrí con agua. Es importante que el agua no sea la misma que de remojo. Tapar y dejar cocinar 1 hora y media en olla común (revolviendo de vez en cuando y viendo si le falta más agua) o 1/2 hora en olla a presión.\r\nPasado este tiempo, agregamos la calabaza cortada en cubos, más agua y los condimentos. Tapamos y repetimos el tiempo: media hora en olla a presión o 1 hora y media en olla común. Cuidado que en esta parte el locro ya tiende a pegarse si está en olla común y hay que revolverlo bastante seguido.\r\nLa salsita: picar el morrón, 1 cebolla de verdeo y 1 cebolla común bien bien finitos. Agregar ají molido (bastante), pimentón y orégano. Cocinar a fuego bajo en bastante aceite de oliva hasta que esté bien blandita la cebolla.\r\nEspesar y servir. 10 minutos antes de servir, agregar la calabaza rallada y cocinar. En ésta receta de locro, éste último paso cumplirá la función de espesarlo lo que no lo espesamos por falta de las patitas (lo que les expliqué arriba). Servir con la salsa encima y la parte verde de la cebolla de verdeo picada.', 'Locro', '2022-11-29 21:33:20', 'aihqpbelcrdir67ttusx'),
	(20, 'acá va la receta y sus ingredientes, agregando algo más', 'milanesa con ensalada y algo más', '2022-11-30 22:27:47', 'vnvfvwwnksgskuwe4ngp');
/*!40000 ALTER TABLE `recetas` ENABLE KEYS */;

-- Volcando estructura para tabla morfifacil.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint(9) unsigned NOT NULL AUTO_INCREMENT,
  `usuario` varchar(200) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `perfil` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1 COMMENT='Contiene la info de los usuarios de la solución';

-- Volcando datos para la tabla morfifacil.usuarios: 3 rows
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellido`, `mail`, `password`, `perfil`) VALUES
	(39, 'galo', 'Galo Ruy', 'Budiño', 'galoruy@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'admin'),
	(37, 'inti', 'Inti Nahuel', 'Budiño', 'IntiNahuel@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'cocinero'),
	(38, 'andrea', 'Andrea', 'Riu', 'andreriu@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'cheff');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
