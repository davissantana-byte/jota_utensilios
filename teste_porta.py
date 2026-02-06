import socket

print("Testando se a porta 3306 está aberta...")

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(5) # Espera no máximo 5 segundos

try:
    # Tenta conectar na porta 3306 (MySQL padrão)
    result = sock.connect_ex(('127.0.0.1', 3306))
    
    if result == 0:
        print("✅ SUCESSO: A porta 3306 está ABERTA e aceitando conexões!")
    else:
        print(f"❌ FALHA: A porta 3306 está FECHADA (Código: {result}).")
        print("O MySQL não está rodando ou está em outra porta.")
        
except Exception as e:
    print(f"Erro ao testar porta: {e}")

finally:
    sock.close()