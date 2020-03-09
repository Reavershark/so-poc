# Modified from https://github.com/frostasm/ntopng-docker/blob/master/Dockerfile
# Following instructions from http://packages.ntop.org/apt-stable/
FROM ubuntu:18.04

RUN apt-get update \
  && apt-get install -y software-properties-common wget \
  && add-apt-repository universe \
  && wget http://apt-stable.ntop.org/18.04/all/apt-ntop-stable.deb \
  && apt install -y ./apt-ntop-stable.deb \
  && rm ./apt-ntop-stable.deb
 
RUN apt-get clean all \
  && apt-get update \
  && apt-get install -y ntopng ntopng-data

RUN apt-get clean all \
  && rm -rf /var/lib/apt/lists/*

CMD ["ntopng"]