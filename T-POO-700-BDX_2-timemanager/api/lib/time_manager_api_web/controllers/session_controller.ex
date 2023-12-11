defmodule TimeManagerApiWeb.SessionController do
  import Plug.Conn

  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Token
  alias TimeManagerApi.Account
  alias TimeManagerApi.Account.User

  action_fallback(TimeManagerApiWeb.FallbackController)

  def sign_in(conn, %{"user" => user}) do
    %{"email" => email, "password" => password} = user

    with {:ok, user} <- Account.authenticate_user(email, password),
         {:ok, token} <- Token.sign(%{user_id: user.id}) do
      conn
      |> put_resp_cookie("Authorization", token, http_only: true, secure: true)
      |> render(:jwt, token: token, user: user)
    else
      _ -> {:error, :emailorpasswordisincorrect}
    end
  end

  def sign_up(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params),
         {:ok, token} <- Token.sign(%{user_id: user.id}) do
      conn
      |> put_resp_cookie("Authorization", token, http_only: true, secure: true)
      |> render(:jwt, token: token, user: user)
    else
      {:error, error} -> {:error, error}
    end
  end

  def me(conn, _params) do
    with user <- conn.assigns.user do
      render(conn, :me, user: user)
    else
      _ -> {:error, :not_found}
    end
  end
end
