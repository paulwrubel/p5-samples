FROM python:3

RUN pip3 install flask

COPY ./docs/ /app/docs/

ENV FLASK_APP=/app/docs/server.py

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]