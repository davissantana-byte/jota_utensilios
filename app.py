from flask import Flask, render_template
import pymysql
import pymysql.cursors

app = Flask(__name__)

# Configuração do banco (para não repetir código)
DB_CONFIG = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '020607',  # Sua senha
    'database': 'jota_utensilios',
    'port': 3306,
    'cursorclass': pymysql.cursors.DictCursor, # Retorna dados como dicionário
    'autocommit': True # Salva automático se fizer alteração
}

def buscar_produtos():
    try:
        conexao = pymysql.connect(**DB_CONFIG)
        
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM produtos")
            dados = cursor.fetchall()
            
            # Debug para você ver no terminal que funcionou
            print(f"\n[SUCESSO] Site carregou {len(dados)} produtos.")
            
            return dados
    except Exception as e:
        print(f"\n[ERRO] Falha ao buscar produtos: {e}")
        return []
    finally:
        # O 'with' fecha o cursor, mas garantimos fechar a conexão se estiver aberta
        if 'conexao' in locals() and conexao.open:
            conexao.close()

@app.route('/')
def index():
    produtos = buscar_produtos()
    return render_template('index.html', produtos=produtos)

@app.route('/exibir_produto/<int:id>')
def exibir_produto(id):
    try:
        conexao = pymysql.connect(**DB_CONFIG)
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM produtos WHERE id = %s", (id,))
            produto = cursor.fetchone()
        
        conexao.close()
        
        if produto:
            return render_template('produtos.html', p=produto)
        else:
            return "Produto não encontrado", 404
            
    except Exception as e:
        print(f"[ERRO] Detalhes do produto {id}: {e}")
        return "Erro interno no servidor", 500


@app.route('/carrinho')
def carrinho():
    # Isso vai buscar o arquivo carrinho.html na pasta templates
    return render_template('carrinho.html')

if __name__ == '__main__':
    print("--- INICIANDO SERVIDOR FLASK COM PYMYSQL ---")
    # use_reloader=False para evitar bugs de travamento no Windows
    app.run(debug=True, port=5000, use_reloader=False)