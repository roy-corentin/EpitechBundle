defmodule TimeManagerApi.AdministratorPermission do
  import Plug.Conn

  def init(opts) do
    opts
  end

  def call(conn, _opts) do
    conn
    |> check_permission
  end

  defp check_permission(conn) do
    user_role = conn.assigns.user.role

    case user_role do
      :administrator -> conn
      _ -> send_401(conn)
    end
  end

  defp send_401(conn, data \\ %{message: "You are not authorized"}) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, Jason.encode!(data))
    |> halt
  end
end
