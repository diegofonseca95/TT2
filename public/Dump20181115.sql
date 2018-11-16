CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradorgrupo`
--

DROP TABLE IF EXISTS `administradorgrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradorgrupo` (
  `idUsuario` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idGrupo`),
  KEY `idGrupo_idx` (`idGrupo`),
  CONSTRAINT `idGrupo_AdminGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuario_AdminGrupo` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `administradorproyecto`
--

DROP TABLE IF EXISTS `administradorproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradorproyecto` (
  `idUsuario` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idProyecto`),
  KEY `ProyectoLider` (`idProyecto`),
  CONSTRAINT `ProyectoLider` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`),
  CONSTRAINT `ProyectoUsuarioLider` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `archivo`
--

DROP TABLE IF EXISTS `archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivo` (
  `idArchivo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(150) NOT NULL,
  `fechaSubida` date NOT NULL,
  PRIMARY KEY (`idArchivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `archivousuario`
--

DROP TABLE IF EXISTS `archivousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivousuario` (
  `idUsuarioProyectoGrupo` int(11) NOT NULL,
  `idArchivo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuarioProyectoGrupo`,`idArchivo`),
  KEY `idArchivo_idx` (`idArchivo`),
  CONSTRAINT `idArchivo` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuarioProyectoGrupo` FOREIGN KEY (`idUsuarioProyectoGrupo`) REFERENCES `usuarioproyectogrupo` (`idUsuarioProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conversacion`
--

DROP TABLE IF EXISTS `conversacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversacion` (
  `idConversacion` int(11) NOT NULL AUTO_INCREMENT,
  `canal` text NOT NULL,
  PRIMARY KEY (`idConversacion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estadogrupo`
--

DROP TABLE IF EXISTS `estadogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadogrupo` (
  `idEstadoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`idEstadoGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estadopublicacion`
--

DROP TABLE IF EXISTS `estadopublicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadopublicacion` (
  `idEstado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(11) NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estadotarea`
--

DROP TABLE IF EXISTS `estadotarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadotarea` (
  `idEstadoTarea` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`idEstadoTarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estadousuario`
--

DROP TABLE IF EXISTS `estadousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadousuario` (
  `idEstadoUsuario` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreGrupo` text NOT NULL,
  `descripcion` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensaje` (
  `idMensaje` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuarioConversacion` int(11) NOT NULL,
  `contenido` text NOT NULL,
  PRIMARY KEY (`idMensaje`),
  KEY `userconver_mensaje` (`idUsuarioConversacion`),
  CONSTRAINT `userconver_mensaje` FOREIGN KEY (`idUsuarioConversacion`) REFERENCES `usuarioconversacion` (`idUsuarioConversacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyecto` (
  `idProyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyectogrupo`
--

DROP TABLE IF EXISTS `proyectogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectogrupo` (
  `idGrupo` int(11) NOT NULL,
  `idProyecto` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idProyectoGrupo`),
  KEY `idGrupo_idx` (`idGrupo`),
  KEY `idProyecto_idx` (`idProyecto`),
  CONSTRAINT `idGrupo_ProyectoGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idProyecto_ProyectoGrupo` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicacion` (
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
  KEY `estado_publicacion` (`estadoPublicacion`),
  CONSTRAINT `estado_publicacion` FOREIGN KEY (`estadoPublicacion`) REFERENCES `estadopublicacion` (`idEstado`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idGrupo_publicacion` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuario_publicacion` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sprint`
--

DROP TABLE IF EXISTS `sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sprint` (
  `idSprint` int(11) NOT NULL AUTO_INCREMENT,
  `numeroSprint` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`idSprint`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sprintproyectogrupo`
--

DROP TABLE IF EXISTS `sprintproyectogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sprintproyectogrupo` (
  `idSprint` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idSprint`,`idProyectoGrupo`),
  KEY `idProyectoGrupo_idx` (`idProyectoGrupo`),
  CONSTRAINT `idProyectoGrupo_FK` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idSprint_FK` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `superadministrador`
--

DROP TABLE IF EXISTS `superadministrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `superadministrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  KEY `usuario_admin` (`idUsuario`),
  CONSTRAINT `usuario_admin` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `estado` int(11) NOT NULL,
  `puntaje` int(11) NOT NULL,
  `numeroTarea` int(11) NOT NULL,
  `evidencia` text NOT NULL,
  PRIMARY KEY (`idTarea`),
  KEY `estado_idx` (`estado`),
  CONSTRAINT `estado_tarea` FOREIGN KEY (`estado`) REFERENCES `estadotarea` (`idEstadoTarea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tareaproyectogrupo`
--

DROP TABLE IF EXISTS `tareaproyectogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tareaproyectogrupo` (
  `idTareaProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `idTarea` int(11) NOT NULL,
  `idProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idTareaProyectoGrupo`),
  KEY `idTarea_idx` (`idTarea`),
  KEY `idProyectoGrupo_idx` (`idProyectoGrupo`),
  CONSTRAINT `idProyectoGrupo_F` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTarea_F` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tareasprint`
--

DROP TABLE IF EXISTS `tareasprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tareasprint` (
  `idTarea` int(11) NOT NULL,
  `idSprint` int(11) NOT NULL,
  PRIMARY KEY (`idTarea`,`idSprint`),
  KEY `sprint_` (`idSprint`),
  CONSTRAINT `sprint_` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tarea_` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tareausuario`
--

DROP TABLE IF EXISTS `tareausuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tareausuario` (
  `idUsuario` int(11) NOT NULL,
  `idTareaProyectoGrupo` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idTareaProyectoGrupo`),
  KEY `idTareaProyectoGrupo_idx` (`idTareaProyectoGrupo`),
  CONSTRAINT `idTareaProyectoGrupo_F` FOREIGN KEY (`idTareaProyectoGrupo`) REFERENCES `tareaproyectogrupo` (`idTareaProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuario_F` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
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
  KEY `estado_idx` (`estado`),
  CONSTRAINT `estado` FOREIGN KEY (`estado`) REFERENCES `estadousuario` (`idEstadoUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarioconversacion`
--

DROP TABLE IF EXISTS `usuarioconversacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarioconversacion` (
  `idUsuarioConversacion` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idConversacion` int(11) NOT NULL,
  PRIMARY KEY (`idUsuarioConversacion`),
  KEY `conversacion_usuario` (`idConversacion`),
  KEY `usuario_conversacion` (`idUsuario`),
  CONSTRAINT `conversacion_usuario` FOREIGN KEY (`idConversacion`) REFERENCES `conversacion` (`idConversacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_conversacion` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuariogrupo`
--

DROP TABLE IF EXISTS `usuariogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuariogrupo` (
  `idGrupo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupo`,`idUsuario`),
  KEY `idusuario_idx` (`idUsuario`),
  CONSTRAINT `idGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idusuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarioproyectogrupo`
--

DROP TABLE IF EXISTS `usuarioproyectogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarioproyectogrupo` (
  `idProyectoGrupo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idUsuarioProyectoGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuarioProyectoGrupo`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idProyectoGrupo_` (`idProyectoGrupo`),
  CONSTRAINT `idProyectoGrupo_` FOREIGN KEY (`idProyectoGrupo`) REFERENCES `proyectogrupo` (`idProyectoGrupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuario_` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-15 18:34:46
