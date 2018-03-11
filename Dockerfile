FROM ubuntu:latest

MAINTAINER zachary.maddox@gmail.com

RUN apt-get update
RUN apt-get install nodejs

EXPOSE 4200

CMD ["npm", "start"]