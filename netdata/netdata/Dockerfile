FROM netdata/netdata

COPY conf/ /etc/netdata/

# Requirements for python.d plugins
RUN apk add py2-pip
RUN pip install docker
RUN apk del py2-pip