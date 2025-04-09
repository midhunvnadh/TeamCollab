FROM node:latest

RUN cd pm-backend && npm i
RUN cd pm-frontend && npm i && npm run build

CMD ["bash", "start.sh"]

