defmodule TimeManagerApi.DefaultPermission do
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
      :employee -> check_employee_permission(conn)
      _ -> send_401(conn)
    end
  end

  defp check_manager_permission(conn) do
    case conn.params do
      %{"user_id" => user_id} ->
        check_manager_can_access_user(conn, user_id)

      %{"id" => user_id} ->
        check_manager_can_access_user(conn, user_id)

      _ ->
        conn
    end
  end

  defp check_manager_can_access_user(conn, user_id) do
    user = conn.assigns.user
    user_id_int = String.to_integer(user_id)

    if user_id_int == user.id || User.manage_this_user?(user, user_id) do
      conn
    else
      send_401(conn)
    end
  end

  defp check_employee_permission(conn) do
    case conn.params do
      %{"id" => user_id} ->
        if String.to_integer(user_id) == conn.assigns.user.id do
          conn
        else
          send_401(conn)
        end

      %{"user_id" => user_id} ->
        if String.to_integer(user_id) == conn.assigns.user.id do
          conn
        else
          send_401(conn)
        end

      _ ->
        conn
    end
  end

  defp send_401(conn, data \\ %{message: "You are not authorized"}) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, Jason.encode!(data))
    |> halt
  end
end
