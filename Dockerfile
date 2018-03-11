FROM node:carbon
COPY . /src
RUN cd /src && npm install && npm run build

FROM httpd:2.4
COPY --from=0 /src/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=0 /src/dist/ /usr/local/apache2/htdocs/