FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

COPY . /src

RUN cd /src && npm install && npm run build

#EXPOSE 4200

#CMD /src/node_modules/http-server/bin/http-server -a 0.0.0.0 -p 4200 /src/dist

FROM httpd:2.4

COPY /src/dist /usr/local/apache2/htdocs/