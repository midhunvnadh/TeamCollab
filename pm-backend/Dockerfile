FROM node:latest

WORKDIR /app
COPY . /app

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

RUN npm i

CMD ["npm", "start"]

