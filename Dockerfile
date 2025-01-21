# Etapa 1: Use uma imagem Node.js oficial como base
FROM node:18-alpine AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Etapa 2: Use uma imagem mais enxuta para o ambiente de produção
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie as dependências instaladas e os arquivos compilados
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponha a porta que a API usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
