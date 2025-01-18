defmodule Api.Cache do
  def connect do
    port = String.to_integer(System.get_env("REDIS_PORT") || "6379")
    host = System.get_env("REDIS_HOST") || "redis"

    {:ok, conn} = Redix.start_link(host: host, port: port)
    conn
  end

  def set_cache(key, value) do
    conn = connect()
    Redix.command(conn, ["SET", key, value])
  end

  def get_cache(key) do
    conn = connect()
    Redix.command(conn, ["GET", key])
  end

  def delete_cache(key) do
    conn = connect()
    {:ok, result} = Redix.command(conn, ["DEL", key])
    result
  end

  def clean_all_cache do
    connect() |> Redix.command(["FLUSHALL"])
  end
end
