FROM python:3.11-rc-bullseye
# install git
RUN apt-get -y update
RUN apt-get -y install git
# install node
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" \
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
RUN source ~/.bashrc
RUN node -v

RUN git clone https://github.com/suraj-swarnapuri/Checkup.git root
RUN cd root/