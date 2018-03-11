FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src; npm install

RUN cd /src; npm run build

RUN ls
RUN ls /src
RUN ls /src/dist

EXPOSE 4200

CMD cd /src/dist && npm run start-docker