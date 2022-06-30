

CREATE USER 'ps_admin'@'%' IDENTIFIED WITH mysql_native_password BY 'faszomkivan';
GRANT ALL PRIVILEGES ON *.* TO 'ps_admin'@'%';

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: database
-- Létrehozás ideje: 2021. Feb 02. 11:16
-- Kiszolgáló verziója: 8.0.22
-- PHP verzió: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ps_tool_dev`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ability`
--

CREATE TABLE `ability` (
  `id` int NOT NULL,
  `pageName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `ability`
--

INSERT INTO `ability` (`id`, `pageName`, `name`) VALUES
(1, 'home', 'delete'),
(2, 'home', 'write'),
(3, 'calendar', 'change_date'),
(4, 'calendar', 'change_plan_in_past');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `group_`
--

CREATE TABLE `group_` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `parentId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `group_`
--

INSERT INTO `group_` (`id`, `name`, `parentId`) VALUES
(1, 'SN', NULL),
(2, 'SND', 1),
(3, 'SNB', 1),
(4, 'SND1', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `group__closure`
--

CREATE TABLE `group__closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `group__closure`
--

INSERT INTO `group__closure` (`id_ancestor`, `id_descendant`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 2),
(2, 4),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `group__leaders_user`
--

CREATE TABLE `group__leaders_user` (
  `group_id` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `group__leaders_user`
--

INSERT INTO `group__leaders_user` (`group_id`, `userId`) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'HR');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role_permission`
--

CREATE TABLE `role_permission` (
  `id` int NOT NULL,
  `roleId` int DEFAULT NULL,
  `abilityId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `role_permission`
--

INSERT INTO `role_permission` (`id`, `roleId`, `abilityId`) VALUES
(3, 1, 1),
(4, 1, 2),
(5, 1, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `parentId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `userName`, `name`, `phoneNumber`, `roleId`, `group_id`, `parentId`) VALUES
(1, 'uib11383', 'Szórádi Géza', '+3620123456', 1, 1, NULL),
(2, 'teszt1', 'Nagy Janos', '+3620123456', 1, 2, 1),
(3, 'teszt2', 'Nagy Pista', '+3620123456', 2, 2, 2),
(4, 'teszt3', 'Kiss Pista', '+3620123456', 2, 3, 1),
(5, 'teszt4', 'Teszt Elek', '+3620123456', 2, 4, 1),
(6, 'teszt5', 'Lakatos Karoly', '+3620123456', 3, 4, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_closure`
--

CREATE TABLE `user_closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `user_closure`
--

INSERT INTO `user_closure` (`id_ancestor`, `id_descendant`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 2),
(2, 3),
(3, 3),
(4, 4),
(5, 5),
(5, 6),
(6, 6);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ability`
--
ALTER TABLE `ability`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `group_`
--
ALTER TABLE `group_`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1388fab8aa412a1b2f25a033a98` (`parentId`);

--
-- A tábla indexei `group__closure`
--
ALTER TABLE `group__closure`
  ADD PRIMARY KEY (`id_ancestor`,`id_descendant`),
  ADD KEY `IDX_528858024c19ffd88e480a1538` (`id_ancestor`),
  ADD KEY `IDX_bc8e85bf9e8532a35ef62f2da3` (`id_descendant`);

--
-- A tábla indexei `group__leaders_user`
--
ALTER TABLE `group__leaders_user`
  ADD PRIMARY KEY (`group_id`,`userId`),
  ADD KEY `IDX_a769451088049eebc835933cef` (`group_id`),
  ADD KEY `IDX_45b8dee13c58c4f732ff61132d` (`userId`);

--
-- A tábla indexei `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e3130a39c1e4a740d044e685730` (`roleId`),
  ADD KEY `FK_fa772e485e1758cd0248075374e` (`abilityId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  ADD KEY `FK_3c29fba6fe013ec8724378ce7c9` (`group_id`),
  ADD KEY `FK_c86f56da7bb30c073e3cbed4e50` (`parentId`);

--
-- A tábla indexei `user_closure`
--
ALTER TABLE `user_closure`
  ADD PRIMARY KEY (`id_ancestor`,`id_descendant`),
  ADD KEY `IDX_dcba9530799a881bdb55f5080b` (`id_ancestor`),
  ADD KEY `IDX_45880eda1f98d31b4400d153a4` (`id_descendant`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ability`
--
ALTER TABLE `ability`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `group_`
--
ALTER TABLE `group_`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `group_`
--
ALTER TABLE `group_`
  ADD CONSTRAINT `FK_1388fab8aa412a1b2f25a033a98` FOREIGN KEY (`parentId`) REFERENCES `group_` (`id`);

--
-- Megkötések a táblához `group__closure`
--
ALTER TABLE `group__closure`
  ADD CONSTRAINT `FK_528858024c19ffd88e480a1538b` FOREIGN KEY (`id_ancestor`) REFERENCES `group_` (`id`),
  ADD CONSTRAINT `FK_bc8e85bf9e8532a35ef62f2da3f` FOREIGN KEY (`id_descendant`) REFERENCES `group_` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;