FROM python:3.11-rc-bullseye
# install git
RUN apt-get -y update
RUN apt-get -y install git
# install node
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
RUN nvm install 8.5.0

RUN git clone https://github.com/suraj-swarnapuri/Checkup.git root
RUN cd root/