FROM node:14.15-alpine

#RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
#RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
#RUN apk add --no-cache mongodb

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["run", "start"]
