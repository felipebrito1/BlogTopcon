# Usando a imagem do Node.js para compilar o projeto React
FROM node:18 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos necessários para dentro do contêiner
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do contêiner
COPY . .

# Compila o projeto React
RUN npm run build

# Usa uma imagem leve para servir o build
FROM nginx:stable-alpine

# Copia os arquivos do build do React para o diretório de servição do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 3000 para acesso ao frontend
EXPOSE 80

# Comando padrão para rodar o servidor
CMD ["nginx", "-g", "daemon off;"]
