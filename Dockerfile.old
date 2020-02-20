FROM node:12

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY ./docs/ /app/static/

COPY ./server.js /app/

EXPOSE 8080

CMD [ "node", "server.js" ]