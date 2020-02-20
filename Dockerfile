# stage: 1 - build
FROM node:latest as react-build
WORKDIR /app
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY ./docs/ ./docs/
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm run build
RUN ls -la

# stage: 2 — deploy
FROM nginx:latest
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
# CMD [“nginx”, “-g”, “daemon off;”]
