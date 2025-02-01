# 📌 Blog Topcon

O **Blog Topcon** é um sistema de gerenciamento de postagens, permitindo que usuários autenticados criem, editem, visualizem e excluam postagens.  
Este projeto foi desenvolvido como parte do processo seletivo da empresa **Topcon**.

---

## 🚀 Tecnologias e Ferramentas  

O projeto utiliza as seguintes tecnologias:  

- **Backend**: C# | .NET 8  
- **Frontend**: React com TypeScript  
- **Banco de Dados**: PostgreSQL  
- **Containerização**: Docker & Docker Compose  

---

## ⚙️ Pré-requisitos  

Antes de iniciar, certifique-se de ter o **Docker** instalado e rodando localmente.  

---

## 🏃 Como Rodar o Projeto  

### 1️⃣ Clone o repositório  

```bash
git clone https://github.com/felipebrito1/BlogTopcon.git
cd BlogTopcon
```

### 2️⃣ Configure as variáveis de ambiente  

O arquivo `.env` (localizado em `BlogTopcon/.env`) armazena a URL da API.  

Caso necessário, ajuste os valores conforme seu ambiente.  

### 3️⃣ Suba os containers  

```bash
docker-compose up -d
```

### 4️⃣ Acesse as interfaces  

- 📜 **Swagger do Backend**: [http://localhost:5000/api/swagger](http://localhost:5000/api/swagger)  
- 🔐 **Tela de Login (Frontend)**: [http://localhost:3000/login](http://localhost:3000/login)  

---

## ✨ Funcionalidades  

### 🔹 **Autenticação**  
- Realizar login  
- Cadastrar usuário  

### 📝 **Gerenciamento de Posts**  
- Listar posts  
- Criar post  
- Editar post  
- Visualizar post  
- Excluir post  

### 👥 **Gerenciamento de Usuários**  
- Listar usuários  
- Excluir usuário  

---

## 📌 Melhorias Futuras (Opcional)  

Caso deseje destacar melhorias ou recursos adicionais planejados, você pode adicionar essa seção.  

---

## 📄 Licença  

Este projeto foi desenvolvido exclusivamente para o processo seletivo da **Topcon** e não possui uma licença pública.  
