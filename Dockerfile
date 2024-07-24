FROM debian:12

RUN apt update && apt install -y ffmpeg node npm
RUN apt install -y autoconf automake g++ libtool
RUN npm install -g n
RUN n lastest

WORKDIR /app
COPY index.js /app
COPY package.json /app
RUN npm install

ENTRYPOINT ["node","/app/index.js"]