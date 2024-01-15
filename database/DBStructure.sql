-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-01-2024 a las 19:37:59
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `novus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maq_bolsas`
--

CREATE TABLE `maq_bolsas` (
  `ID` int(11) NOT NULL,
  `unixtime` int(11) NOT NULL,
  `HR_COUNTER1` int(11) NOT NULL,
  `HR_COUNTER2` int(11) NOT NULL,
  `datetime` datetime GENERATED ALWAYS AS (from_unixtime(`unixtime`)) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 
--
-- Indices de la tabla `maq_bolsas`
--
ALTER TABLE `maq_bolsas`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `maq_bolsas`
--
ALTER TABLE `maq_bolsas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8948;

