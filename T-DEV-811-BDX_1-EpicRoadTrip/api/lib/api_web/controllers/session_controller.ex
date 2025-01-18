defmodule ApiWeb.SessionController do
  import Plug.Conn

  use ApiWeb, :controller

  alias Api.Token
  alias Api.Account
  alias Api.Account.User

  action_fallback(ApiWeb.FallbackController)

  use PhoenixSwagger

  def swagger_definitions do
    %{
      User: swagger_schema do
        title "User"
        description "A user of Epic Road Trip"
        properties do
          id :string, "Unique identifier", required: true, example: "1"
          username :string, "Usernames", required: true, example: "jean_dujardin"
          email :string, "Users email", required: true,  example: "jean_dujardin@mail.com"
        end
      end,
      Users: swagger_schema do
        title "Users"
        description "A collection of Epic Road Trip' users"
        type :array
        items Schema.ref(:User)
      end
    }
  end

  # TBF
  swagger_path :sign_in do
    post "/sign_in"
    summary "Sign in"
    description "Sign in a user"
    tag "User (Account & Session)"
    consumes "application/json"
    produces "application/json"
    parameter :body, :user, :json, "User credentials", required: true
    response 200, "OK", Schema.ref(:User)
    response 400, :error
  end

  def sign_in(conn, %{"user" => user}) do
    %{"email" => email, "password" => password} = user

    with {:ok, user} <- Account.authenticate_user(email, password),
         {:ok, token} <- Token.sign(%{user_id: user.id}) do
      conn
      |> put_resp_cookie("Authorization", token, http_only: true)
      |> render(:user, user: user)
    else
      _ -> {:error, :emailorpasswordisincorrect}
    end
  end

  # TBF
  swagger_path :sign_up do
    post "/sign_up"
    summary "Sign up"
    description "Sign up a user"
    tag "User (Account & Session)"
    consumes "application/json"
    produces "application/json"
    parameter :body, :user, :json, "User credentials", required: true
    response 200, "OK", Schema.ref(:User)
    response 400, :error
  end

  def sign_up(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params),
         {:ok, token} <- Token.sign(%{user_id: user.id}) do
      conn
      |> put_resp_cookie("Authorization", token, http_only: true)
      |> render(:user, user: user)
    else
      {:error, error} -> {:error, error}
    end
  end

  swagger_path :me do
    get "/me"
    summary "Me"
    description "Get current user"
    tag "User (Account & Session)"
    produces "application/json"
    response 200, :me, "OK", Schema.ref(:User)
    response 404, :error
  end

  def me(conn, _params) do
    with user <- conn.assigns.user do
      render(conn, :me, user: user)
    else
      _ -> {:error, :not_found}
    end
  end
end
