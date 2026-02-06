import mysql.connector 

try: 
    # Estabelecendo a conexão com o banco de dados
    conexao = mysql.connector.connect(
        host='localhost',
        user='root',
        password='020607',
        database='jota_utensilios',
        port=3306
    )

    cursor = conexao.cursor()

    # Executando a consulta para listar todos os produtos
    cursor.execute("SELECT nome , preco FROM produtos")
    produtos = cursor.fetchall()

    print("\n--- Lista de Produtos ---")
    for p in produtos:
        print(f"Item: {p[0]} - Preço: R$ {p[1]}")
    print("------------------------\n")

except mysql.connector.Error as erro:
    print(f"Erro ao conectar ao banco de dados: {erro}")

finally:
    if 'conexao' in locals() and conexao.is_connected():
        cursor.close()
        conexao.close()
        print("Conexão ao banco de dados encerrada.")

