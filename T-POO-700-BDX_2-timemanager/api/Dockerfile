FROM bitwalker/alpine-elixir-phoenix:latest

ENV APP_HOME /api
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY mix.exs mix.lock ./
RUN mix deps.get

COPY lib/ ./lib/
COPY priv/ ./priv/
COPY test/ ./test/
COPY config/ ./config/

RUN mix compile

CMD ["mix","phx.server"]
