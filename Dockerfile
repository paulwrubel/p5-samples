FROM nginx

EXPOSE 8080

COPY ./docs/ /usr/share/nginx/html/