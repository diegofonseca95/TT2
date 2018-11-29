-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2018 a las 04:35:17
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `telefono`, `correo`, `estado`, `contrasena`, `remember_token`) VALUES
(18, 'Luis Martin', 'Jiménez', 'Rodríguez', '5523342334', 'luis@gmail.com', 1, '12345678', 'vpW2EIU02tdDd3NDv41tDrJeFKaT3mswqO3q1Gfbw6FbbeMraIxSZikdgzmq'),
(19, 'Diego Alberto', 'Fonseca', 'Gómez', '5567890989', 'diego@gmail.com', 1, '12345678', '1aDO7Rx4WXb7iVxcnq09glFppoAqCYqLAlvfcwWemQLkmr2e9oxarFk2RWH8');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

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
