FROM node:10

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3009
CMD ["npm", "run", "production"]