# Stage 1: Build the Go binary
FROM golang:1.20-alpine AS builder

# Install git (needed for go get, mod tidy)
RUN apk add --no-cache git

WORKDIR /app

# Copy only necessary files
COPY main.go .

# Initialize Go module (in container)
RUN go mod init smackapi && go mod tidy

# Build the Go binary
RUN go build -o smackapi main.go

# Stage 2: Minimal runtime image
FROM alpine:3.17

WORKDIR /app

# Copy built binary from builder
COPY --from=builder /app/smackapi .

ENV VERSION=v1
EXPOSE 8080

# Run the binary
CMD ["./smackapi"]
