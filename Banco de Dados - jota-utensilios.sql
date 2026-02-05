-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: jota_utensilios
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Cadeado para Bike com Senha 8x1000mm','Este é um cadeado para bicicleta B-TEK com senha. Possui um cabo de aço trançado resistente com revestimento em PVC flexivel, que ajuda a evitar danos à pintura da bicicleta. O comprimento do cabo é de 1000mm (1 metro), com um diâmetro de 8mm. Utiliza um sistema de combinação numérica (senha) de 4 dígitos, eliminando a necessidade de chaves. É um item leve e prático, ideal para uso diário em bicicletas, motos ou para prender outros objetos.',20.00,'Trava de Segurança',NULL),(2,'Trava de Segurança 20mm x 1200mm ID-6000T','Trata-se de uma trava de segurança com cabo de aço da marca Idea, modelo ID-6000T. Tipo: Cadeado com cabo de aço trançado e revestimento em PVC. Dimensões: 20mm de espessura por 1200mm de comprimento. Uso: Ideal para proteção de motos, bicicletas, estepes e portões. Características: Trava articulada, resistente, de fácil manuseio e com sistema de chave multiponto para maior segurança.',56.00,'Trava de Segurança',NULL),(3,'Trava de Segurança Security Lock 9mm x 800mm','Este é um cadeado de cabo de aço flexivel para bicicletas, com a marca \"Security Lock\". Projetado para prender uma bicicleta a um objeto fixo, como um bicicletário ou poste, para evitar roubo. Possui um cabo de aço trançado, revestido com uma capa protetora de plástico vermelho para evitar arranhões na bicicleta. Funciona com um mecanismo de chave, com a parte do corpo do cadeado em plástico amarelo. É descrito como um acessório prático, leve e econômico para o dia a dia.',14.00,'Trava de Segurança',NULL),(4,'Trava de Segurança 11mm x 800mm IDEA ID-0440','O Cadeado Stam 30mm é a escolha ideal para quem busca segurança e durabilidade. Fabricado em latão maciço e com haste de aço endurecido, ele oferece alta resistência contra cortes e corrosão. Perfeito para armários de academia, caixas de ferramentas, portões pequenos e janelas.',25.00,'Trava de Segurança',NULL),(5,'Trava de Segurança 15mm x 800mm IDEA ID-5996T','Esta trava de segurança da marca Idea é composta por um cabo de aço revestido em PVC colorido (disponível em vermelho e preto), apresentando dimensões de $15	ext{ mm}$ de espessura por $800	ext{ mm}$ de comprimento. O produto utiliza um sistema de fechamento por chave com cabeçote reforçado em metal cromado e plástico ABS, sendo acompanhado por duas chaves para garantir o acesso reserva. Com um design compacto e flexível, é indicado para a proteção de itens como bicicletas, estepes e portões, oferecendo resistência contra cortes e proteção contra intempéries.',34.00,'Trava de Segurança',NULL),(6,'Trava de Segurança 18mm x 900mm IDEA ID-0881T','Trata-se de um cadeado de segurança para bicicleta ou moto, com as seguintes características; Marca: Ideia. Tipo: Trava de segurança com cabo de aço flexível. Abertura: Por chave, acompanha duas unidades. Especificações: 18 mm de espessura por 900 mm de comprimento. Características adicionais: Revestimento plástico para evitar arranhões e danos à pintura da bicicleta.',30.00,'Trava de Segurança',NULL),(7,'Trava de Segurança para Bike ou Motocicleta','O objeto na imagem é uma trava de segurança para motocicleta (ou bicicleta). Função: Acessório de segurança projetado para proteger o veículo contra roubos e furtos, travando partes móveis para impedir que seja facilmente manuseado ou levado. Material: Geralmente feita de aço robusto com capa protetora (como na imagem). Características: Possui um fecho que funciona como um cadeado e vem com chaves. Uso: Permite que a corrente seja passada em diferentes partes da moto (como roda, quadro ou coroa) e fixada a objetos externos, como postes ou portões, para segurança adicional.',64.00,'Trava de Segurança',NULL);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05  9:34:58
