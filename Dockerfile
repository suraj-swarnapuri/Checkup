FROM nikolaik/python-nodejs:latest
# install git
RUN apt-get -y update && apt-get -y install git

RUN cd root/ && git clone -b refactor-devcontainer https://github.com/suraj-swarnapuri/Checkup.git 
RUN cd root/Checkup/ && chmod +x . && ./script/start-dev