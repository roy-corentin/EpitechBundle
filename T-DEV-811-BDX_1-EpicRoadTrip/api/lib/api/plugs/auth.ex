defmodule Api.Authenticate do
  import Plug.Conn

  def init(opts) do
    opts
  end

  def call(%Plug.Conn{request_path: _path} = conn, _opts) do
    conn
    |> get_auth_header
    |> authenticate
  end

  defp get_auth_header(conn) do
    case get_req_header(conn, "authorization") do
      [token] -> {conn, token}
      _ -> {conn}
    end
  end

  defp authenticate({conn, "Bearer " <> jwt}) do
    case Api.Token.verify(jwt) do
      {:ok, data} -> assign(conn, :user, Api.Account.get_user!(data.user_id))
      {:error, err} -> send_401(conn, %{error: err})
    end
  end

  defp authenticate({conn}) do
    send_401(conn, %{message: "Please make sure you have authentication header"})
  end

  defp send_401(conn, data) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, Jason.encode!(data))
    |> halt
  end
end
