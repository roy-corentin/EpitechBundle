defmodule ApiWeb.SessionControllerTest do
  use ApiWeb.ConnCase

  import Api.AccountFixtures

  @signin_attrs %{
    "email" => "test@mail.com",
    "password" => "password"
  }

  @create_attrs %{
    "username" => "username",
    "email" => "test@mail.com",
    "password" => "password"
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "sign in user" do
    setup [:create_user]

    test "return the user connected", %{conn: conn} do
      conn =
        post(conn, ~p"/api/sign_in", user: @signin_attrs)

      assert json_response(conn, 200)["data"]["user"]
    end
  end

  describe "sign up user" do
    test "return the user created", %{conn: conn} do
      conn =
        post(conn, ~p"/api/sign_up", user: @create_attrs)

      assert json_response(conn, 200)["data"]["user"]
    end
  end

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end
end
