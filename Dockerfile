FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src && npm install && npm run build && npm install -g http-server

EXPOSE 4200

CMD npm run start-docker