FROM node:latest

WORKDIR /app
COPY . /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm i && npm run build

CMD ["npm", "start"]