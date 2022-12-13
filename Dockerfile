FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --prod --network-timeout 1000000
RUN yarn add @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start"]