FROM node:17-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /.

RUN npm install

COPY . .
RUN npm run build
CMD npm run server

