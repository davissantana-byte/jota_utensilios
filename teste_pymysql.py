import pymysql.cursors

print("--- TENTANDO CONEXÃO COM PYMYSQL ---")

try:
    # Conexão usando PyMySQL (Substituto do mysql.connector)
    conexao = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='020607',  # Sua senha
        database='jota_utensilios',
        port=3306,
        cursorclass=pymysql.cursors.DictCursor, # Já traz como dicionário!
        connect_timeout=10 # Se travar, ele avisa em 10 segundos
    )

    print("✅ SUCESSO! Conexão estabelecida com PyMySQL.")
    
    with conexao.cursor() as cursor:
        cursor.execute("SELECT * FROM produtos")
        dados = cursor.fetchall()
        print(f"📦 Produtos encontrados no banco: {len(dados)}")
        
        if len(dados) > 0:
            print(f"🔎 Exemplo de produto: {dados[0]['nome']}")
    
    conexao.close()

except Exception as e:
    print(f"❌ ERRO: {e}")