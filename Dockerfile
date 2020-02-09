FROM python:3

RUN pip3 install flask

COPY ./web/ /app/web/

ENV FLASK_APP=/app/web/server.py

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]