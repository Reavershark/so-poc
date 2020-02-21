FROM alpine:3.11.3 AS builder
RUN apk add go git
RUN GOPATH=/go/src/gotty go get github.com/yudai/gotty

FROM alpine:3.11.3
RUN apk add openssh-client
COPY --from=builder /go/src/gotty/bin/gotty /usr/local/bin/
CMD ["gotty"]