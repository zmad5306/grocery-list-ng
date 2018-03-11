FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src; npm install

RUN cd /src; npm run build

RUN ls

EXPOSE 4200

CMD cd /src/dist; npm run start-docker