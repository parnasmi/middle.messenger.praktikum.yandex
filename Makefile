build:
	docker build -t chatapp .
run:
	docker run -p 80:3000 -d chatapp
