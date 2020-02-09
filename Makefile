IMAGE_NAME=test-flask-app
PORT=5000

all: build run

run:
	docker run -p $(PORT):$(PORT) $(IMAGE_NAME)

build:
	docker build -t $(IMAGE_NAME):latest .
