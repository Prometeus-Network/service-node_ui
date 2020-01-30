FROM node:10

WORKDIR /usr/src/app

RUN yarn install

EXPOSE 3009
CMD ["yarn", "run", "production"]
