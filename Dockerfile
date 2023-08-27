#Simple size about 400Mb

FROM oven/bun:latest AS build-stage

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
ENV NODE_ENV=production

EXPOSE $PORT

CMD ["./server"]

# lin_wh_UCoplCt6h43DFeq5AE6F0DYlQVKBFn4czFgGe3bhifuJ