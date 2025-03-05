FROM node:21.5.0

WORKDIR /user/src

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
