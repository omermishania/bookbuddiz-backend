FROM node:lts-alpine

# Create an application directory
RUN mkdir -p /app

# The /app directory is the main application directory
WORKDIR /app

COPY package.json .

RUN npm install

COPY src/ .

EXPOSE 3000

CMD ["npx", "ts-node", "app.ts"]
