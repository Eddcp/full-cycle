# syntax=docker/dockerfile:1
FROM golang:1.19-alpine as builder

WORKDIR /app

# Download Go modules
COPY go.mod ./
RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /full-cycle-rocks

FROM scratch
COPY --from=builder /full-cycle-rocks /full-cycle-rocks

ENTRYPOINT ["/full-cycle-rocks"]