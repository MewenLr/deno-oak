FROM hayd/deno-alpine:1.8.3

EXPOSE 8000

WORKDIR /server

USER deno

ADD . .

RUN deno cache src/index.ts

CMD ["run", "--allow-net", "src/index.ts"]
