FROM node:13 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --silent
ADD . .
RUN yarn build

FROM node:13
RUN yarn global add serve
WORKDIR /build
COPY --from=builder /app/build /build
CMD [ "serve", "-l", "tcp://0.0.0.0:80" ]