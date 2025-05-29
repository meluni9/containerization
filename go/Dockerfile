FROM golang:1.24.3 AS builder

WORKDIR /app

COPY . .

RUN go mod download && go mod verify

RUN mkdir -p build && go build -o build/fizzbuzz

FROM gcr.io/distroless/base

COPY --from=builder /app/build/fizzbuzz /fizzbuzz
COPY --from=builder /app/templates /templates

EXPOSE 8080

CMD ["/fizzbuzz", "serve"]
