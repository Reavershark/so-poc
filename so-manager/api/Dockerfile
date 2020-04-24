FROM dlang2/dmd-ubuntu:2.090.0 AS builder

# Required by vibe-d:tls
RUN apt-get update && apt-get install -y libssl-dev

WORKDIR /dlang/app

COPY dub.json dub.selections.json ./
RUN mkdir source && touch source/app.d && dub build --build=release && rm source -rf

COPY . .
RUN dub build --build=release

FROM ubuntu:18.04
RUN apt-get update && apt-get install -y libssl-dev
COPY --from=builder /dlang/app/so-manager-api /usr/local/bin/
CMD ["so-manager-api"]