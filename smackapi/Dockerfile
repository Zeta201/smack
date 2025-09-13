FROM golang:1.20-alpine AS builder

WORKDIR /app
COPY . .

RUN go mod init smackapi
RUN go mod tidy
RUN go build -o smackapi main.go

FROM alpine:3.17
WORKDIR /app
COPY --from=builder /app/smackapi .

ENV VERSION=v1
EXPOSE 8080

CMD ["./smackapi"]
