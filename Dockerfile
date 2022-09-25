FROM nikolaik/python-nodejs:latest
# install git
RUN apt-get -y update && apt-get -y install git

RUN cd root/ && git -C Checkup pull || git clone https://github.com/suraj-swarnapuri/Checkup.git  Checkup
RUN cd root/Checkup && ./script/start-dev