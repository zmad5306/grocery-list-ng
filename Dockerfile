FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

RUN ls

COPY . /src

RUN cd /src && npm install && npm run build --output-path ../dist

EXPOSE 4200

CMD /src/node_modules/http-server/bin/http-server -a 0.0.0.0 -p 4200 /dist