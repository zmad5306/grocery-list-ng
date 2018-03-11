FROM node:carbon
COPY . /src
RUN cd /src && npm install && npm run build

FROM php:apache
RUN a2enmod rewrite
COPY --from=0 /src/dist/ /usr/local/apache2/htdocs/