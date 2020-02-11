IMAGE_NAME=vixuals
EXTERNAL_PORT=8080
NGINX_PORT=80
FLASK_PORT=5000

CONTAINER_ID=docker ps | grep $(IMAGE_NAME) | cut -d " " -f1

INTERNAL_PORT=$(NGINX_PORT)

all: build run

run:
	docker run -p $(EXTERNAL_PORT):$(INTERNAL_PORT) $(IMAGE_NAME)

build:
	docker build -t $(IMAGE_NAME):latest .

id:
	$(CONTAINER_ID)

kill:
	docker kill $(CONTAINER_ID)
