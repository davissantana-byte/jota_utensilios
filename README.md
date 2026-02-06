# 🛠️ Jota Utensílios - E-commerce Web

Projeto de e-commerce desenvolvido para uma loja de ferramentas e utensílios, focado na exibição dinâmica de produtos via Banco de Dados e gerenciamento de carrinho de compras.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-2.x-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## 📋 Sobre o Projeto

O **Jota Utensílios** é uma aplicação web Fullstack que simula o ambiente de compra de uma loja de materiais. O objetivo principal foi criar uma arquitetura onde o Front-end (HTML/CSS) consome dados reais de um Back-end (Python/Flask) integrado a um banco relacional (MySQL).

### 🚀 Funcionalidades Principais

* **Catálogo Dinâmico:** Os produtos (Nome, Preço, Imagem, Categoria) são puxados diretamente do banco de dados MySQL.
* **Filtragem por Categoria:** Lógica no Backend/Template para exibir produtos específicos (Ferramentas, Cadeados, Elétrica, etc.).
* **Página de Detalhes:** Rota dinâmica (`/exibir_produto/<id>`) que carrega as informações exclusivas de cada item.
* **Carrinho de Compras:** Gerenciamento de itens selecionados pelo usuário.
* **Conexão Robusta:** Utilização do driver `PyMySQL` para garantir estabilidade na conexão com o banco de dados.

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Python, Flask (Framework Web).
* **Banco de Dados:** MySQL (Server), PyMySQL (Driver de conexão).
* **Front-end:** HTML5, CSS3, JavaScript (Manipulação do DOM e Carrinho).
* **Ferramentas:** VS Code, MySQL Workbench, Git.

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza um banco chamado `jota_utensilios` com a seguinte estrutura principal:

```sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    descricao TEXT
);
