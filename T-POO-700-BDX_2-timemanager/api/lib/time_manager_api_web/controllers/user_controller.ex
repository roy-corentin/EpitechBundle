defmodule TimeManagerApiWeb.UserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Account
  alias TimeManagerApi.Account.User

  action_fallback(TimeManagerApiWeb.FallbackController)

  def index(conn, %{"username" => username, "email" => email}) do
    users = Account.find_user_by_email_username!(email, username)
    render(conn, :index, users: users)
  end

  def index(conn, %{"username" => username}) do
    users = Account.find_users_by_username!(username)
    render(conn, :index, users: users)
  end

  def index(conn, %{"email" => email}) do
    users = Account.find_user_by_email!(email)
    render(conn, :index, users: users)
  end

  def index(conn, %{}) do
    users = Account.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:show, user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Account.get_user!(id)

    with {:ok, %User{} = user} <- Account.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Account.get_user!(id)

    with {:ok, %User{}} <- Account.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
