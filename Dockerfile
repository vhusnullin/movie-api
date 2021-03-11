FROM node:14.15-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["run", "start:prod"]
