FROM node:latest

WORKDIR /app
COPY . /app


RUN npm i && npm run build

CMD ["npm", "start"]