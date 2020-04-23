FROM dlanguage/dmd:2.080.0 AS builder
RUN apt-get update && apt-get install -y libssl-dev
COPY dub.json dub.selections.json ./
RUN dub build --build=release || true
COPY . .
RUN dub build --build=release

FROM ubuntu:16.04
RUN apt-get update && apt-get install -y libssl-dev
COPY --from=builder /src/so-manager-api /usr/local/bin/
CMD ["so-manager-api"]