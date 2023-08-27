#Simple size about 400Mb

FROM oven/bun:latest as build-stage

WORKDIR /dist

COPY . .

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install
RUN bun build ./src/index.ts --minify --compile --outfile server

# Reduce image size
FROM oven/bun:latest

WORKDIR /app

COPY --from=build-stage /dist/server ./server

ARG PORT=8000
ENV PORT=$PORT

EXPOSE $PORT

CMD ["./server"]