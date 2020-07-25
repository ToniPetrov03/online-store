FROM node:14.5.0-alpine
RUN mkdir -p /srv/app/api
WORKDIR /srv/app/api

COPY package*.json /srv/app/api/
RUN npm i
COPY . /srv/app/api
ENV WAIT_VERSION 2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev
