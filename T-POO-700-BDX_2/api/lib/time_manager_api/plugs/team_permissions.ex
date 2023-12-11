defmodule TimeManagerApi.TeamPermission do
  import Plug.Conn

  alias TimeManagerApi.Account.User

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
      :manager -> check_manager_permission(conn)
      _ -> send_401(conn)
    end
  end

  defp check_manager_permission(conn) do
    case conn.params do
      %{"team_id" => team_id} ->
        check_manager_can_access_team(conn, team_id)

      %{"id" => team_id} ->
        check_manager_can_access_team(conn, team_id)

      _ ->
        send_401(conn)
    end
  end

  defp check_manager_can_access_team(conn, team_id) do
    user = conn.assigns.user

    case User.manage_this_team?(user, team_id) do
      true -> conn
      false -> send_401(conn)
    end
  end

  defp send_401(conn, data \\ %{message: "You are not authorized"}) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, Jason.encode!(data))
    |> halt
  end
end
