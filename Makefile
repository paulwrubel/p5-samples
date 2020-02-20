IMAGE_NAME=vixuals
EXTERNAL_PORT=8080
NGINX_PORT=80
FLASK_PORT=5000
NODE_PORT=3000

CONTAINER_ID=$(shell docker ps | grep $(IMAGE_NAME) | cut -d " " -f1)

INTERNAL_PORT=$(NGINX_PORT)

all: build run

run: kill
	docker run -d -p $(EXTERNAL_PORT):$(INTERNAL_PORT) $(IMAGE_NAME)

build: kill
	docker build -t $(IMAGE_NAME):latest .

kill:
	-docker kill $(CONTAINER_ID)

logs:
	docker logs $(CONTAINER_ID)

follow:
	docker logs -f $(CONTAINER_ID)

ps: 
	docker ps

id: 
	@echo $(CONTAINER_ID)

show: ps
