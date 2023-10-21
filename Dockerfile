FROM oven/bun:1.0.7 AS base

FROM base AS build-stage

WORKDIR /dist

COPY . .

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install
RUN bun build ./src/index.ts --minify --compile --outfile server

FROM base

WORKDIR /app

COPY --from=build-stage /dist/server ./server

ARG PORT=8000
ENV PORT=$PORT
ENV NODE_ENV=production

EXPOSE $PORT

CMD ["./server"]