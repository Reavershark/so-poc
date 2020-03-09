FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY server.conf.template /etc/nginx/conf.d/

CMD ["/bin/sh" , "-c" , "envsubst < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/server.conf && exec nginx -g 'daemon off;'"]