FROM node:10-alpine
COPY package.json .
RUN yarn 
COPY . .
RUN yarn run build
EXPOSE 7070

CMD yarn start:dev