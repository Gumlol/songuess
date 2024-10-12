FROM node:lts-alpine3.20

WORKDIR /code

COPY . /code/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]