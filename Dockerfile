FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE $REACT_APP_PRODUCTUION_PORT

CMD ["yarn", "run", "production"]
