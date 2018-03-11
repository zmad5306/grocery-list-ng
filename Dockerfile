FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src && npm install && npm run build

FROM httpd:2.4

COPY /src/dist/ /usr/local/apache2/htdocs/