from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

def buscar_produtos():
    conexao = mysql.connector.connect(
        host='localhost',
        user='root',
        password='AmoebaJavaScript2025!',
        database='loja_jota'
    )
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT id, nome, preco, categoria FROM produtos")

    dados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return dados

@app.route('/')
def index():
    produtos = buscar_produtos()
    return render_template('index.html', produtos=produtos)




@app.route('/exibir_produto/<int:id>')
def exibir_produto(id):
    conexao = mysql.connector.connect(
        host='localhost',
        user='root',
        password='AmoebaJavaScript2025!',
        database='loja_jota'
    )
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT id, nome, preco, categoria, descricao FROM produtos WHERE id = %s", (id,))
    produto = cursor.fetchone()
    cursor.close()
    conexao.close()
    return render_template('produtos.html', p=produto)


if __name__ == '__main__':
    app.run(debug=True)