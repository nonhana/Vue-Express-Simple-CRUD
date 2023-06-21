CREATE DATABASE  IF NOT EXISTS `web_finaltest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `web_finaltest`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: web_finaltest
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stuinfo`
--

DROP TABLE IF EXISTS `stuinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stuinfo` (
  `StuNo` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `Sex` char(2) NOT NULL,
  `Birth` date NOT NULL,
  `MajorId` int NOT NULL,
  PRIMARY KEY (`StuNo`),
  UNIQUE KEY `StuNo_UNIQUE` (`StuNo`),
  KEY `MajorId_idx_idx` (`MajorId`),
  CONSTRAINT `MajorId_idx` FOREIGN KEY (`MajorId`) REFERENCES `major` (`MajorId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stuinfo`
--

LOCK TABLES `stuinfo` WRITE;
/*!40000 ALTER TABLE `stuinfo` DISABLE KEYS */;
INSERT INTO `stuinfo` VALUES (1,'张三','男','1990-09-20',1),(2,'李四','男','1990-08-10',1),(3,'王五','男','1989-03-04',2),(4,'陈豪','男','1988-02-03',2),(5,'张庭','女','1991-05-04',3),(6,'李勇','男','1988-04-06',3),(7,'王燕','女','1990-05-12',4),(8,'赵倩','女','1989-12-23',4);
/*!40000 ALTER TABLE `stuinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-21 14:43:44
