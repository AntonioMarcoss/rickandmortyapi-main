
# Rick and Morty Fullstack

Este projeto é uma aplicação fullstack baseada na temática Rick and Morty, desenvolvida com:
- **React.js** no front-end
- **Express.js** no back-end
- **MongoDB** como banco de dados

## 🚀 Como Executar

### 1. MongoDB

- Certifique-se que o **MongoDB** está rodando localmente em `mongodb://localhost:27017`
- A base de dados utilizada é `rickdb`

### 2. Back-End

cd backend
npm install
node server.js

> Servidor disponível em `http://localhost:3001`

### 3. Front-End

cd frontend
npm install
npm run dev

> Interface acessível em `http://localhost:5173`

## 🔐 Login

Para acessar o sistema, utilize:

- **Usuário:** `admin`
- **Senha:** `admin`

Caso não exista no banco, insira no MongoDB manualmente com o seguinte documento:

{
  "username": "admin",
  "password": "$2b$12$..jUcxVk4qTGl17gZMW19ufVcIVkKiQUsbtwYhEz543v4R3Fvla3i"
}

## 👨‍🏫 Pronto para avaliação!