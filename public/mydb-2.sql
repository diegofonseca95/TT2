-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2018 a las 02:39:30
-- Versión del servidor: 5.7.9
-- Versión de PHP: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

DROP TABLE IF EXISTS `actividad`;
CREATE TABLE IF NOT EXISTS `actividad` (
  `idActividad` int(11) NOT NULL AUTO_INCREMENT,
  `idProyecto` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idActividad`),
  KEY `fk_proyecto` (`idProyecto`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idActividad`, `idProyecto`, `mensaje`, `fecha`) VALUES
(17, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:31'),
(16, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:30'),
(15, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:29'),
(14, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:28'),
(13, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:23'),
(12, 13, 'Diego Alberto Fonseca ha creado el proyecto', '2018-11-30 04:43:52'),
(11, 12, 'María Jiménez ha creado el proyecto', '2018-11-30 02:13:47'),
(10, 11, 'María Jiménez ha creado el proyecto', '2018-11-30 02:09:58'),
(18, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:32'),
(19, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 04:52:33'),
(20, 13, 'Diego Alberto Fonseca ha asignado una tarea a Luis Martin Jiménez Rodríguez', '2018-11-30 04:58:25'),
(21, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 10:03:21'),
(22, 13, 'Diego Alberto Fonseca ha asignado una tarea a Luis Martin Jiménez Rodríguez', '2018-11-30 10:04:11'),
(23, 13, 'Diego Alberto Fonseca ha asignado una tarea a María del Carmen Díaz Moreno', '2018-11-30 10:05:41'),
(24, 13, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 10:05:57'),
(25, 13, 'Diego Alberto Fonseca ha asignado una tarea a Luis Martin Jiménez Rodríguez', '2018-11-30 10:06:32'),
(26, 12, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 10:07:03'),
(27, 12, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 10:12:18'),
(28, 12, 'Diego Alberto Fonseca ha agregado un nuevo sprint', '2018-11-30 10:12:28'),
(29, 12, 'Diego Alberto Fonseca ha agregado a Luis Martin Jiménez Rodríguez', '2018-11-30 10:14:22'),
(30, 12, 'Diego Alberto Fonseca ha asignado una tarea a Luis Martin Jiménez Rodríguez', '2018-11-30 10:14:44'),
(31, 13, 'Diego Alberto Fonseca ha asignado una tarea a María del Carmen Díaz Moreno', '2018-11-30 10:20:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradorgrupo`
--

DROP TABLE IF EXISTS `administradorgrupo`;
CREATE TABLE IF NOT EXISTS `administradorgrupo` (
  `idUsuario` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idGrupo`),
  KEY `idGrupo_idx` (`idGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administradorgrupo`
--

INSERT INTO `administradorgrupo` (`idUsuario`, `idGrupo`) VALUES
(31, 15),
(19, 16),
(27, 17),
(29, 18),
(29, 19),
(30, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradorproyecto`
--

DROP TABLE IF EXISTS `administradorproyecto`;
CREATE TABLE IF NOT EXISTS `administradorproyecto` (
  `idUsuario` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idProyecto`),
  KEY `ProyectoLider` (`idProyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administradorproyecto`
--

INSERT INTO `administradorproyecto` (`idUsuario`, `idProyecto`) VALUES
(19, 11),
(19, 12),
(19, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

DROP TABLE IF EXISTS `archivo`;
CREATE TABLE IF NOT EXISTS `archivo` (
  `idArchivo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(150) NOT NULL,
  `fechaSubida` date NOT NULL,
  PRIMARY KEY (`idArchivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivousuario`
--

DROP TABLE IF EXISTS `archivousuario`;
CREATE TABLE IF NOT EXISTS `archivousuario` (
  `idUsuarioProyectoGrupo` int(11) NOT NULL,
  `idArchivo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuarioProyectoGrupo`,`idArchivo`),
  KEY `idArchivo_idx` (`idArchivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversacion`
--

DROP TABLE IF EXISTS `conversacion`;
CREATE TABLE IF NOT EXISTS `conversacion` (
  `idConversacion` int(11) NOT NULL AUTO_INCREMENT,
  `canal` text NOT NULL,
  PRIMARY KEY (`idConversacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `conversacion`
--

INSERT INTO `conversacion` (`idConversacion`, `canal`) VALUES
(1, 'private-chat.18'),
(2, 'private-chat.18.19'),
(3, 'private-chat.40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadogrupo`
--

DROP TABLE IF EXISTS `estadogrupo`;
CREATE TABLE IF NOT EXISTS `estadogrupo` (
  `idEstadoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`idEstadoGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadopublicacion`
--

DROP TABLE IF EXISTS `estadopublicacion`;
CREATE TABLE IF NOT EXISTS `estadopublicacion` (
  `idEstado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(11) NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estadopublicacion`
--

INSERT INTO `estadopublicacion` (`idEstado`, `descripcion`) VALUES
(1, 'aprobada'),
(2, 'pendiente'),
(3, 'rechazada'),
(4, 'eliminada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadotarea`
--

DROP TABLE IF EXISTS `estadotarea`;
CREATE TABLE IF NOT EXISTS `estadotarea` (
  `idEstadoTarea` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`idEstadoTarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estadotarea`
--

INSERT INTO `estadotarea` (`idEstadoTarea`, `estado`, `descripcion`) VALUES
(1, '0', 'eliminado'),
(2, '1', 'sin asignar'),
(3, '2', 'asignada'),
(4, '3', 'work in progress'),
(5, '4', 'terminada'),
(6, '5', 'rechazada'),
(7, '6', 'pendiente de aprobacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadousuario`
--

DROP TABLE IF EXISTS `estadousuario`;
CREATE TABLE IF NOT EXISTS `estadousuario` (
  `idEstadoUsuario` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estadousuario`
--

INSERT INTO `estadousuario` (`idEstadoUsuario`, `estado`) VALUES
(1, 'aceptado'),
(2, 'pendiente'),
(3, 'eliminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreGrupo` text NOT NULL,
  `descripcion` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `nombreGrupo`, `descripcion`, `estado`) VALUES
(15, 'Comité organizador de la región México y Centro América del ACM ICPC', 'Grupo de organización para la toma de decisiones ejecutivas de la región del ACM ICPC México y Centro América para el ciclo de competencias 2018-2019', 1),
(16, 'Creación de problemas y concursos.', 'En el siguiente grupo se colabora para la creación de problemas y concurso para el ciclo de competencias de 2018-2019.', 1),
(17, 'Organización de campamentos y entrenamientos', 'El en grupo se coordinan todos los proyectos relacionados a la organización de eventos que impulsen la difusión del conocimiento dentro de la región de México y Centro América del ACM ICPC tales como charlas, campamentos, entre otros.', 1),
(18, 'Sedes', 'Grupo de trabajo para la gestión de la información de los equipos e instituciones pertenecientes a cada sede de competencias así como la organización de los eventos que tendrán lugar en las sedes.', 1),
(19, 'Entrenadores e instituciones', 'Grupo para la gestión de la información de todos los equipos participantes (estudiantes, entrenadores e instituciones) dentro del concurso ACM ICPC en la región México y Centro América.', 1),
(20, 'Difusión y Marketing', 'Grupo de trabajo destinado a la difusión del evento en toda la región así como al contacto con patrocinadores interesados en impulsar la competencia ACM ICPC.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
CREATE TABLE IF NOT EXISTS `mensaje` (
  `idMensaje` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuarioConversacion` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMensaje`),
  KEY `userconver_mensaje` (`idUsuarioConversacion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idMensaje`, `idUsuarioConversacion`, `contenido`, `fecha`) VALUES
(1, 1, 'Te han asignado una nueva tarea en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 7', '2018-11-30 04:58:28'),
(2, 2, 'Hola Diego, empezaré a trabajar en la revisión de los problemas', '2018-11-30 05:00:13'),
(3, 3, 'Gracias Luis', '2018-11-30 05:00:34'),
(4, 3, 'Adjunto los problemas en el proyecto para que puedas revisarlos', '2018-11-30 05:01:04'),
(5, 2, 'Muchas gracias', '2018-11-30 05:01:15'),
(6, 3, 'Revisa los archivos compaartidos, los problemas los podrás encontrar ahí.', '2018-11-30 05:01:58'),
(7, 2, 'Vale, los revisaré', '2018-11-30 05:02:11'),
(8, 2, 'El reporte estará listo en un par de horas', '2018-11-30 05:03:04'),
(9, 1, 'Te han validado la tarea Revisión de los problemas del mundial en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 7', '2018-11-30 05:04:12'),
(10, 1, 'Te han asignado una nueva tarea en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 8', '2018-11-30 10:04:11'),
(11, 4, 'Te han asignado una nueva tarea en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 7', '2018-11-30 10:05:42'),
(12, 1, 'Te han asignado una nueva tarea en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 9', '2018-11-30 10:06:32'),
(13, 1, 'Te han validado la tarea Propuesta de un problema para la fecha. en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 8', '2018-11-30 10:10:16'),
(14, 1, 'Te han validado la tarea Revisión de problema en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 9', '2018-11-30 10:10:35'),
(15, 1, 'Te han asignado una nueva tarea en el proyecto Seguimiento al grupo de creación de problemas y concursos. en la iteracion 1', '2018-11-30 10:14:44'),
(16, 4, 'Te han asignado una nueva tarea en el proyecto Creación concurso primer fecha 2018-2019 en la iteracion 9', '2018-11-30 10:20:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
CREATE TABLE IF NOT EXISTS `proyecto` (
  `idProyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`idProyecto`, `nombreProyecto`, `fecha_inicio`, `fecha_fin`, `descripcion`, `estado`) VALUES
(11, 'Seguimiento del grupo de creación de problemas y concursos.', '2018-11-30', NULL, 'El siguiente proyecto tiene como objetivo dar un seguimiento a las actividades realizadas en torno a la creación de los problemas y concursos para el ciclo de competencias 2018-2019.', 3),
(12, 'Seguimiento al grupo de creación de problemas y concursos.', '2018-11-30', NULL, 'Proyecto en el cual se dará seguimiento a las actividades realizadas en torno a la creación de problemas y concursos para el ciclo de competencias 2018-2019.', 1),
(13, 'Creación concurso primer fecha 2018-2019', '2018-11-30', NULL, 'Se trabajará en la creación del problemset para la primer fecha del ciclo de competencias.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectogrupo`
--

DROP TABLE IF EXISTS `proyectogrupo`;
CREATE TABLE IF NOT EXISTS `proyectogrupo` (
  `idGrupo` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idProyectoGrupo`),
  KEY `idGrupo_idx` (`idGrupo`),
  KEY `idProyecto_idx` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyectogrupo`
--

INSERT INTO `proyectogrupo` (`idGrupo`, `idProyecto`, `idProyectoGrupo`) VALUES
(15, 11, 10),
(15, 12, 11),
(16, 13, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
CREATE TABLE IF NOT EXISTS `publicacion` (
  `idPublicacion` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text NOT NULL,
  `contenido` text NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `fechaCreacion` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `estadoPublicacion` int(11) NOT NULL,
  PRIMARY KEY (`idPublicacion`),
  KEY `idGrupo_publicacion` (`idGrupo`),
  KEY `idUsuario_publicacion` (`idUsuario`),
  KEY `estado_publicacion` (`estadoPublicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`idPublicacion`, `titulo`, `contenido`, `idUsuario`, `idGrupo`, `fechaCreacion`, `estadoPublicacion`) VALUES
(1, 'Trabajando arduamente para la primera fecha.', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>El equipo&nbsp;de creaci&oacute;n de problemas se encuentra&nbsp;trabajando en la primer fecha para&nbsp;el ciclo 2018 2019. Estamos&nbsp;esper&aacute;ndolos&nbsp;!!!</p>\n<p><img src="data:image/jpeg;base64,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" alt="" width="308" height="231" /></p>\n</body>\n</html>', 18, 16, '2018-11-30 05:22:39', 4);
INSERT INTO `publicacion` (`idPublicacion`, `titulo`, `contenido`, `idUsuario`, `idGrupo`, `fechaCreacion`, `estadoPublicacion`) VALUES
(2, 'La primer fecha se acerca.', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>El equipo&nbsp;de creaci&oacute;n&nbsp;de problemas&nbsp;se encuentra&nbsp;trabajando&nbsp;arduamente para tener el primer concurso listo. Los esperamos!!!</p>\n<p>&nbsp;</p>\n<p><img src="data:image/jpeg;base64,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" alt="" /></p>\n</body>\n</html>', 18, 16, '2018-11-30 05:28:04', 4);
INSERT INTO `publicacion` (`idPublicacion`, `titulo`, `contenido`, `idUsuario`, `idGrupo`, `fechaCreacion`, `estadoPublicacion`) VALUES
(3, 'El equipo se prepara para la primer fecha.', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>La regi&oacute;n M&eacute;xico y&nbsp;Centro&nbsp;Am&eacute;rica&nbsp;se prepara para&nbsp;tener&nbsp;todos los preparativos para&nbsp;un ciclo&nbsp;exitoso de competencias. Los esperamos&nbsp;a todos&nbsp;!!!.</p>\n<p><img src="data:image/jpeg;base64,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" alt="" /></p>\n</body>\n</html>', 18, 15, '2018-11-30 05:35:37', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sprint`
--

DROP TABLE IF EXISTS `sprint`;
CREATE TABLE IF NOT EXISTS `sprint` (
  `idSprint` int(11) NOT NULL AUTO_INCREMENT,
  `numeroSprint` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`idSprint`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sprint`
--

INSERT INTO `sprint` (`idSprint`, `numeroSprint`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 1, '2018-11-30', '2018-12-01'),
(2, 2, '2018-11-30', '2018-12-01'),
(3, 3, '2018-11-30', '2018-12-01'),
(4, 4, '2018-11-30', '2018-12-01'),
(5, 5, '2018-11-30', '2018-12-01'),
(6, 6, '2018-11-30', '2018-12-01'),
(7, 7, '2018-11-30', '2018-12-01'),
(8, 8, '2018-11-30', '2018-12-02'),
(9, 9, '2018-11-30', '2018-12-03'),
(10, 1, '2018-11-30', '2018-12-01'),
(11, 2, '2018-11-30', '2018-12-02'),
(12, 3, '2018-11-30', '2018-12-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sprintproyectogrupo`
--

DROP TABLE IF EXISTS `sprintproyectogrupo`;
CREATE TABLE IF NOT EXISTS `sprintproyectogrupo` (
  `idSprint` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idSprint`,`idProyectoGrupo`),
  KEY `idProyectoGrupo_idx` (`idProyectoGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sprintproyectogrupo`
--

INSERT INTO `sprintproyectogrupo` (`idSprint`, `idProyectoGrupo`) VALUES
(10, 11),
(11, 11),
(12, 11),
(1, 12),
(2, 12),
(3, 12),
(4, 12),
(5, 12),
(6, 12),
(7, 12),
(8, 12),
(9, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superadministrador`
--

DROP TABLE IF EXISTS `superadministrador`;
CREATE TABLE IF NOT EXISTS `superadministrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  KEY `usuario_admin` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `superadministrador`
--

INSERT INTO `superadministrador` (`idAdministrador`, `idUsuario`) VALUES
(1, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

DROP TABLE IF EXISTS `tarea`;
CREATE TABLE IF NOT EXISTS `tarea` (
  `idTarea` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `estado` int(11) NOT NULL,
  `puntaje` int(11) NOT NULL,
  `numeroTarea` int(11) NOT NULL,
  `evidencia` text NOT NULL,
  PRIMARY KEY (`idTarea`),
  KEY `estado_idx` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `descripcion`, `estado`, `puntaje`, `numeroTarea`, `evidencia`) VALUES
(1, 'Revisión de los problemas del mundial', 5, 5, 1, 'Informe de clasificación de los problemas.'),
(2, 'Propuesta de un problema para la fecha.', 5, 5, 2, 'Archivo ZIP con el problema incluyendo casos y descripción.'),
(3, 'Revisión de descripciones', 3, 3, 3, 'Archivo con las posibles observaciones.'),
(4, 'Revisión de problema', 5, 4, 4, 'Archivo con la solución en código en .cpp'),
(5, 'Solicitar reportes de restricciones de los problemas.', 3, 3, 1, 'Archivo pdf con las restricciones especificadas.'),
(6, 'Junta con los creadores de problemas.', 2, 2, 2, 'Foto que compruebe la junta realizada.'),
(7, 'Revisión de las imágenes adjuntas a los problemas.', 3, 4, 5, 'Reporte con las posibles observaciones.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareaproyectogrupo`
--

DROP TABLE IF EXISTS `tareaproyectogrupo`;
CREATE TABLE IF NOT EXISTS `tareaproyectogrupo` (
  `idTareaProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `idTarea` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idTareaProyectoGrupo`),
  KEY `idTarea_idx` (`idTarea`),
  KEY `idProyectoGrupo_idx` (`idProyectoGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tareaproyectogrupo`
--

INSERT INTO `tareaproyectogrupo` (`idTareaProyectoGrupo`, `idTarea`, `idProyectoGrupo`) VALUES
(1, 1, 12),
(2, 2, 12),
(3, 3, 12),
(4, 4, 12),
(5, 5, 11),
(6, 6, 11),
(7, 7, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareasprint`
--

DROP TABLE IF EXISTS `tareasprint`;
CREATE TABLE IF NOT EXISTS `tareasprint` (
  `idTarea` int(11) NOT NULL,
  `idSprint` int(11) NOT NULL,
  PRIMARY KEY (`idTarea`,`idSprint`),
  KEY `sprint_` (`idSprint`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tareasprint`
--

INSERT INTO `tareasprint` (`idTarea`, `idSprint`) VALUES
(1, 7),
(3, 7),
(2, 8),
(4, 9),
(7, 9),
(5, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareausuario`
--

DROP TABLE IF EXISTS `tareausuario`;
CREATE TABLE IF NOT EXISTS `tareausuario` (
  `idUsuario` int(11) NOT NULL,
  `idTareaProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idTareaProyectoGrupo`),
  KEY `idTareaProyectoGrupo_idx` (`idTareaProyectoGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tareausuario`
--

INSERT INTO `tareausuario` (`idUsuario`, `idTareaProyectoGrupo`) VALUES
(18, 1),
(18, 2),
(40, 3),
(18, 4),
(18, 5),
(40, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidoPaterno` varchar(100) NOT NULL,
  `apellidoMaterno` varchar(100) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `correo` varchar(256) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '2',
  `contrasena` varchar(20) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `estado_idx` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `telefono`, `correo`, `estado`, `contrasena`, `remember_token`) VALUES
(18, 'Luis Martin', 'Jiménez', 'Rodríguez', '5523342334', 'luis@gmail.com', 1, '12345678', '7aKMikmOP5tmcMLp0lzQ6xE8USkjzBrlYoBTSm5aqP3Hx4GdmeEoyxc7wvHD'),
(19, 'Diego Alberto', 'Fonseca', 'Gómez', '5567890989', 'diego@gmail.com', 1, '12345678', 'uepvzmkYmVk9kJBscjRDFIn6MKplI9iMoNRD6QTuzRSiyo3XWBj8MDyuqDSJ'),
(25, 'Juan', 'García', 'González', '5598275869', 'juan_garcia@gmail.com', 3, 'juan_garcia', NULL),
(26, 'José Luis', 'Rodríguez', 'Fernández', '5598340157', 'jose_rodriguez@gmail.com', 3, 'jose_rodriguez', NULL),
(27, 'José', 'López', 'Martínez', '5509348966', 'jose_lopez@gmail.com', 1, 'jose_lopez', NULL),
(28, 'María Guadalupe', 'Sánchez', 'Peréz', '5593057285', 'maria_guadalupe@gmail.com', 1, 'maria_guadalupe', NULL),
(29, 'Francisco', 'Sánchez', 'Pérez', '5500293811', 'francisco_sanchez@gmail.com', 1, 'francisco_sanchez', NULL),
(30, 'Guadalupe', 'Gómez', 'Martín', '5509125869', 'guadalupe_gomez@gmail.com', 1, 'guadalupe_gomez', NULL),
(31, 'María', 'Jiménez', 'Ruiz', '5523493409', 'maria_jimenez@gmail.com', 1, 'maria_jimenez', 'tJG8LGWe9rytvKrqUy3KlfGyfI4NkG6odm8sHbF75OdTqbcuTmkbJmpdZwVO'),
(32, 'Juana', 'Hernández', 'Díaz', '5599002409', 'juana_hernandez@gmail.com', 1, 'juana_hernandez', NULL),
(33, 'Antonio', 'Moreno', 'García', '5509248567', 'antonio_moreno@gmail.com', 1, 'antonio_moreno', NULL),
(34, 'Jesús', 'González', 'Rodríguez', '5523415343', 'jesus_gonzalez@gmail.com', 1, 'jesus_gonzalez', NULL),
(35, 'Miguel Ángel', 'Fernández', 'López', '5599033498', 'miguel_fernandez@gmail.com', 1, 'miguel_fernandez', NULL),
(36, 'Pedro', 'Martínez', 'Sánchez', '5596781736', 'pedro_martinez@gmail.com', 1, 'pedro_martinez', NULL),
(37, 'Alejandro', 'Pérez', 'Gómez', '4409238954', 'alejandro_perez@gmail.com', 1, 'alejandro_perez', NULL),
(38, 'Manuel', 'Martín', 'Jiménez', '1209436589', 'manuel_martin@gmail.com', 1, 'manuel_martin', NULL),
(39, 'Margarita', 'Ruiz', 'Hernández', '4409238965', 'margarita_ruiz@gmail.com', 1, 'margarita_ruiz', NULL),
(40, 'María del Carmen', 'Díaz', 'Moreno', '7709230940', 'maria_diaz@gmail.com', 1, 'maria_diaz', NULL),
(41, 'Juan Carlos', 'Reyes', 'Villa', '9943096589', 'juan_reyes@gmail.com', 1, 'juan_reyes', NULL),
(42, 'Roberto', 'Medina', 'Castro', '7798540923', 'roberto_medina@gmail.com', 1, 'roberto_medina', NULL),
(43, 'Fernando', 'Santos', 'Mendoza', '1209349856', 'fernando_santos@gmail.com', 1, 'fernando_santos', NULL),
(44, 'Daniel', 'Mendoza', 'Santos', '0945096709', 'daniel_mendoza@gmail.com', 1, 'daniel_mendoza', NULL),
(45, 'Carlos', 'Castro', 'Medina', '5509459856', 'carlos_castro@gmail.com', 1, 'carlos_castro', NULL),
(46, 'Jorge', 'Villa', 'Reyes', '5509450967', 'jorge_villa@gmail.com', 1, 'jorge_villa', NULL),
(47, 'Ricardo', 'García', 'González', '5509450967', 'ricardo_garcia@gmail.com', 1, 'ricardo_garcia', NULL),
(48, 'Miguel', 'Rodríguez', 'Fernández', '5599002486', 'miguel_rodriguez@gmail.com', 1, 'miguel_rodriguez', NULL),
(49, 'Eduardo', 'López', 'Martínez', '5509340912', 'eduardo_lopez@gmail.com', 1, 'eduardo_lopez', NULL),
(50, 'Javier', 'Sánchez', 'Pérez', '5509450967', 'javier_sanchez@gmail.com', 1, 'javier_sanchez', NULL),
(51, 'Rafael', 'Gómez', 'Martin', '9945069180', 'rafael@gmail.com', 1, 'rafael_gomez', NULL),
(52, 'Martín', 'Jiménez', 'Ruiz', '5599440059', 'martin_jimenez@gmail.com', 1, 'martin_jimenez', NULL),
(53, 'Raúl', 'Hernández', 'Díaz', '5500348956', 'raul_hernandez@gmail.com', 1, 'raul_hernandez', NULL),
(54, 'David', 'Moreno', 'García', '5809345678', 'david_moreno@gmail.com', 1, 'david_moreno', NULL),
(55, 'Josfina', 'González', 'Rodríguez', '5599450967', 'josefina_gonzalez@gmail.com', 1, 'josefina_gonzalez', NULL),
(56, 'Jose Antonio', 'Fernández', 'López', '5599667709', 'jose_fernandez@gmail.com', 1, 'jose_fernandez', NULL),
(57, 'Arturo', 'Martínez', 'Sánchez', '5599003349', 'arturo_martinez@gmail.com', 1, 'arturo_martinez', NULL),
(58, 'Marco Antonio', 'Pérez', 'Gómez', '5599220034', 'marco_perez@gmail.com', 1, 'marco_perez', NULL),
(59, 'José Manuel', 'Martínez', 'Sánchez', '4499550956', 'jose_martinez@gmail.com', 1, 'jose_martinez', NULL),
(60, 'José Manuel', 'Martin', 'Jiménez', '5599220945', 'jose_martin@gmail.com', 1, 'jose_martin', NULL),
(61, 'Francisco Javier', 'Ruiz', 'Hernández', '5599220957', 'francisco_ruiz@gmail.com', 2, 'francisco_ruiz', NULL),
(62, 'Enrique', 'Díaz', 'Moreno', '5599146739', 'enrique_diaz@gmail.com', 2, 'enrique_diaz', NULL),
(63, 'Verónica', 'Reyes', 'Villa', '5598340957', 'veronica_reyes@gmail.com', 2, 'veronica_reyes', NULL),
(64, 'Gerardo', 'Medina', 'Castro', '5509234945', 'gerardo_medina@gmail.com', 2, 'gerardo_medina', NULL),
(65, 'María Elena', 'Santos', 'Mendoza', '5567349856', 'maria_santos@gmail.com', 1, 'maria_santos', NULL),
(66, 'María Fernanda', 'Rodríguez', 'Fernández', '5589783465', 'maria_rodriguez@gmail.com', 1, 'maria_rodriguez', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioconversacion`
--

DROP TABLE IF EXISTS `usuarioconversacion`;
CREATE TABLE IF NOT EXISTS `usuarioconversacion` (
  `idUsuarioConversacion` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idConversacion` int(11) NOT NULL,
  PRIMARY KEY (`idUsuarioConversacion`),
  KEY `conversacion_usuario` (`idConversacion`),
  KEY `usuario_conversacion` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarioconversacion`
--

INSERT INTO `usuarioconversacion` (`idUsuarioConversacion`, `idUsuario`, `idConversacion`) VALUES
(1, 18, 1),
(2, 18, 2),
(3, 19, 2),
(4, 40, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariogrupo`
--

DROP TABLE IF EXISTS `usuariogrupo`;
CREATE TABLE IF NOT EXISTS `usuariogrupo` (
  `idGrupo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupo`,`idUsuario`),
  KEY `idusuario_idx` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuariogrupo`
--

INSERT INTO `usuariogrupo` (`idGrupo`, `idUsuario`, `estado`) VALUES
(15, 18, 1),
(15, 19, 1),
(15, 27, 1),
(15, 29, 1),
(15, 30, 1),
(15, 31, 1),
(15, 32, 1),
(16, 18, 1),
(16, 19, 1),
(16, 40, 1),
(16, 44, 1),
(16, 54, 1),
(16, 57, 1),
(16, 58, 1),
(16, 60, 1),
(16, 65, 1),
(16, 66, 1),
(17, 27, 1),
(17, 56, 1),
(17, 57, 1),
(17, 58, 1),
(17, 59, 1),
(17, 60, 1),
(17, 65, 1),
(17, 66, 1),
(18, 29, 1),
(18, 48, 1),
(18, 49, 1),
(18, 50, 1),
(18, 51, 1),
(18, 52, 1),
(18, 53, 1),
(18, 54, 1),
(18, 55, 1),
(19, 29, 1),
(19, 35, 1),
(19, 36, 1),
(19, 37, 1),
(19, 38, 1),
(19, 39, 1),
(19, 40, 1),
(19, 41, 1),
(19, 42, 1),
(19, 43, 1),
(19, 44, 1),
(20, 30, 1),
(20, 53, 1),
(20, 54, 1),
(20, 55, 1),
(20, 56, 1),
(20, 57, 1),
(20, 58, 1),
(20, 59, 1),
(20, 60, 1),
(20, 65, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioproyectogrupo`
--

DROP TABLE IF EXISTS `usuarioproyectogrupo`;
CREATE TABLE IF NOT EXISTS `usuarioproyectogrupo` (
  `idProyectoGrupo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idUsuarioProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuarioProyectoGrupo`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idProyectoGrupo_` (`idProyectoGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarioproyectogrupo`
--

INSERT INTO `usuarioproyectogrupo` (`idProyectoGrupo`, `idUsuario`, `idUsuarioProyectoGrupo`, `estado`) VALUES
(10, 19, 22, 1),
(10, 18, 23, 1),
(10, 30, 24, 1),
(11, 19, 25, 1),
(11, 27, 26, 1),
(11, 29, 27, 1),
(12, 19, 28, 1),
(12, 40, 29, 1),
(12, 44, 30, 1),
(12, 18, 31, 1),
(12, 58, 32, 1),
(12, 65, 33, 1),
(11, 18, 34, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradorgrupo`
--
ALTER TABLE `administradorgrupo`
  ADD CONSTRAINT `idGrupo_AdminGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuario_AdminGrupo` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `administradorproyecto`
--
ALTER TABLE `administradorproyecto`
  ADD CONSTRAINT `ProyectoLider` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`),
  ADD CONSTRAINT `ProyectoUsuarioLider` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `archivousuario`
--
ALTER TABLE `archivousuario`
  ADD CONSTRAINT `idArchivo` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuarioProyectoGrupo` FOREIGN KEY (`idUsuarioProyectoGrupo`) REFERENCES `usuarioproyectogrupo` (`idUsuarioProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `userconver_mensaje` FOREIGN KEY (`idUsuarioConversacion`) REFERENCES `usuarioconversacion` (`idUsuarioConversacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectogrupo`
--
ALTER TABLE `proyectogrupo`
  ADD CONSTRAINT `idGrupo_ProyectoGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idProyecto_ProyectoGrupo` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `estado_publicacion` FOREIGN KEY (`estadoPublicacion`) REFERENCES `estadopublicacion` (`idEstado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idGrupo_publicacion` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuario_publicacion` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sprintproyectogrupo`
--
ALTER TABLE `sprintproyectogrupo`
  ADD CONSTRAINT `idProyectoGrupo_FK` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idSprint_FK` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `superadministrador`
--
ALTER TABLE `superadministrador`
  ADD CONSTRAINT `usuario_admin` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `estado_tarea` FOREIGN KEY (`estado`) REFERENCES `estadotarea` (`idEstadoTarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareaproyectogrupo`
--
ALTER TABLE `tareaproyectogrupo`
  ADD CONSTRAINT `idProyectoGrupo_F` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idTarea_F` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareasprint`
--
ALTER TABLE `tareasprint`
  ADD CONSTRAINT `sprint_` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarea_` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareausuario`
--
ALTER TABLE `tareausuario`
  ADD CONSTRAINT `idTareaProyectoGrupo_F` FOREIGN KEY (`idTareaProyectoGrupo`) REFERENCES `tareaproyectogrupo` (`idTareaProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuario_F` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `estado` FOREIGN KEY (`estado`) REFERENCES `estadousuario` (`idEstadoUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioconversacion`
--
ALTER TABLE `usuarioconversacion`
  ADD CONSTRAINT `conversacion_usuario` FOREIGN KEY (`idConversacion`) REFERENCES `conversacion` (`idConversacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_conversacion` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariogrupo`
--
ALTER TABLE `usuariogrupo`
  ADD CONSTRAINT `idGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idusuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioproyectogrupo`
--
ALTER TABLE `usuarioproyectogrupo`
  ADD CONSTRAINT `idProyectoGrupo_` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuario_` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
