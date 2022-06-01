FROM ubuntu:latest
RUN apt update

# for install n
RUN apt install -y curl

# install old nodejs and npm
RUN apt install nodejs -y
RUN apt install npm -y

# for version up nodejs
RUN npm install -g n
RUN n 16.13.1

# uninstall old nodejs and npm
RUN apt purge nodejs npm -y

# for version up npm
RUN npm install -g npm
RUN npm update -g

# to avoid "npm ERR! Tracker "idealTree" already exists"
WORKDIR /usr/app
COPY ./ /usr/app

# module etc...
RUN npm install node-fetch --save
RUN npm install cypress --save



# RUN apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
# -> 55 -> 4 -> 17?

# CMD ./node_modules/.bin/cypress open