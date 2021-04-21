# stage: 1 - build
FROM node:latest as react-build
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./src/ ./src/
COPY ./public/ ./public/
# COPY ./docs/ ./docs/
RUN npm run build

# stage: 2 — deploy
FROM nginx:latest
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
