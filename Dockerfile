FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src; npm install

EXPOSE 4200

CMD cd /src && npm run start-docker