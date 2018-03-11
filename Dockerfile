FROM centos:centos6

MAINTAINER zachary.maddox@gmail.com

RUN yum install -y npm

EXPOSE 4200

CMD ["npm", "start"]