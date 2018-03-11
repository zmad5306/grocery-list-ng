FROM node:carbon

MAINTAINER zachary.maddox@gmail.com

RUN npm install && npm run build

EXPOSE 4200

CMD /node_modules/http-server/bin/http-server -a 0.0.0.0 -p 4200 /dist