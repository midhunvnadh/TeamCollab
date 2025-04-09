FROM node:latest

WORKDIR /app
COPY pm-backend /app

RUN cd pm-backend && npm i

CMD ["npm", "start"]

