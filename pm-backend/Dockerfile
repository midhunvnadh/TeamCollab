FROM node:latest

WORKDIR /app
COPY . /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=true

RUN npm i

CMD ["npm", "start"]

