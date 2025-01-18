FROM bitwalker/alpine-elixir-phoenix:latest as builder

WORKDIR /app
COPY . .

RUN mix local.hex --force \
    && mix local.rebar --force \
    && mix deps.get \
    && mix deps.compile \
    && mix phx.swagger.generate --force

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]
