# 🛠️ Jota Utensílios - E-commerce Web

Projeto de e-commerce desenvolvido para uma loja de ferramentas e utensílios, focado na exibição dinâmica de produtos via Banco de Dados e gerenciamento de carrinho de compras.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-2.x-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## 📋 Sobre o Projeto

O **Jota Utensílios** é uma aplicação web Fullstack que simula o ambiente de compra de uma loja de materiais. O objetivo principal foi criar uma arquitetura onde o Front-end (HTML/CSS) consome dados reais de um Back-end (Python/Flask) integrado a um banco relacional (MySQL).

### 🚀 Funcionalidades Principais

* **Catálogo Dinâmico:** Os produtos (Nome, Preço, Imagem, Categoria) são puxados diretamente do banco de dados MySQL em tempo real.
* **Filtragem por Categoria:** Lógica no Backend para organizar produtos (Ferramentas, Cadeados, Elétrica, etc.).
* **Página de Detalhes:** Rota dinâmica (`/exibir_produto/<id>`) que carrega as informações exclusivas de cada item.
* **Carrinho de Compras:** Interface para visualização de itens selecionados.
* **Conexão Robusta:** Utilização do driver `PyMySQL` para alta estabilidade na conexão com o banco de dados.

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Python, Flask (Framework Web).
* **Banco de Dados:** MySQL (Server), PyMySQL (Driver).
* **Front-end:** HTML5, CSS3, JavaScript.
* **Ferramentas:** VS Code, MySQL Workbench, Git.

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza um banco chamado `jota_utensilios`. O script SQL principal para a tabela de produtos é:

```sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    descricao TEXT
);
```

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* Python instalado.
* MySQL Server rodando (Porta 3306).

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/jota-utensilios.git](https://github.com/SEU-USUARIO/jota-utensilios.git)
    cd jota-utensilios
    ```

2.  **Instale as dependências:**
    ```bash
    pip install flask pymysql
    ```

3.  **Configure o Banco de Dados:**
    * Crie um banco chamado `jota_utensilios` no seu MySQL.
    * Rode o script SQL para criar a tabela `produtos`.
    * No arquivo `app.py`, ajuste a senha do banco se necessário.

4.  **Execute a aplicação:**
    ```bash
    python app.py
    ```

5.  **Acesse:**
    Abra o navegador em `http://127.0.0.1:5000`

## ✒️ Autor

**Davi Santana**
* [LinkedIn](https://www.linkedin.com/in/davi-santana-byte/)
* [GitHub](https://github.com/davissantana-byte)

---
*Desenvolvido com foco em lógica de programação e integração de sistemas.*
