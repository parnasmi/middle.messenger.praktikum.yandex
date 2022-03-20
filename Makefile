build:
	docker build -t chatapp .
build:heroku
	 docker buildx build --platform linux/amd64  -t registry.heroku.com/infinite-depths-38111/web .
push:heroku
	docker push registry.heroku.com/infinite-depths-38111/web
release:heroku
	heroku container:release web -a infinite-depths-38111
run:
	docker run -p 80:3000 -d chatapp
