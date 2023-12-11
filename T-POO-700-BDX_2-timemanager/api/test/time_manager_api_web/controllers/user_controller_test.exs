defmodule TimeManagerApiWeb.UserControllerTest do
  use TimeManagerApiWeb.ConnCase

  import TimeManagerApi.AccountFixtures

  alias TimeManagerApi.Account.User

  @create_attrs %{
    username: "username",
    email: "test@email.com",
    password: "password",
    password_confirmation: "password"
  }
  @update_attrs %{
    username: "some updated username",
    email: "new@email.com"
  }
  @invalid_attrs %{username: nil, email: nil}

  setup %{conn: conn} do
    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header(
        "authorization",
        "Bearer SFMyNTY.g2gDdAAAAAF3B3VzZXJfaWRhAW4GAIKmKaaLAW4EAADIfpo.CikBywUdbs7SMjelz4AaPuKLZ6zt2scmnne3k3DEsj0"
      )

    {:ok, conn: conn}
  end

  describe "index" do
    setup [:create_user]

    test "find by username and email", %{conn: conn} do
      conn = get(conn, ~p"/api/users?username=username&email=test@email.com")

      assert [
               %{
                 "email" => "test@email.com",
                 "username" => "username"
               }
             ] = json_response(conn, 200)["data"]
    end

    test "find by username", %{conn: conn} do
      conn = get(conn, ~p"/api/users?username=username")
      # assert json_response(conn, 200)["data"] == []
      assert [
               %{
                 "email" => "test@email.com",
                 "username" => "username"
               }
             ] = json_response(conn, 200)["data"]
    end

    test "find by email", %{conn: conn} do
      conn = get(conn, ~p"/api/users?email=test@email.com")
      # assert json_response(conn, 200)["data"] == []
      assert [
               %{
                 "email" => "test@email.com",
                 "username" => "username"
               }
             ] = json_response(conn, 200)["data"]
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/users", user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/users/#{id}")

      assert %{
               "id" => ^id,
               "email" => "test@email.com",
               "username" => "username"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/users", user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      conn = put(conn, ~p"/api/users/#{user}", user: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/users/#{id}")

      assert %{
               "id" => ^id,
               "email" => "new@email.com",
               "username" => "some updated username"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put(conn, ~p"/api/users/#{user}", user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, ~p"/api/users/#{user}")
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, ~p"/api/users/#{user}")
      end)
    end
  end

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end
end
