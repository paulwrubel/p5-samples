# stage: 1 - build
FROM node:latest as react-build
WORKDIR /app

# copy package and depencency list
COPY ./package.json ./
COPY ./package-lock.json ./

# install dependencies
RUN npm install

# copy our source files
COPY ./src/ ./src/
COPY ./public/ ./public/
ADD jsconfig.json jsconfig.json

# build static files
RUN npm run build

# stage: 2 — deploy
FROM nginx:latest

# copy nginx config for react-router compatibility
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy static files from last stage
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80
