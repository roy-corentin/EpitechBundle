defmodule Api.AccountTest do
  use Api.DataCase

  alias Api.Account

  describe "users" do
    alias Api.Account.User

    import Api.AccountFixtures

    @invalid_attrs %{username: nil, email: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert [user] = Account.list_users()
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert user = Account.get_user!(user.id)
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{username: "some username", email: "test@mail.com", password: "password"}

      assert {:ok, %User{} = user} = Account.create_user(valid_attrs)
      assert user.username == "some username"
      assert user.email == "test@mail.com"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()

      update_attrs = %{
        username: "some updated username",
        email: "newtest@mail.com",
        password: "password"
      }

      assert {:ok, %User{} = user} = Account.update_user(user, update_attrs)
      assert user.username == "some updated username"
      assert user.email == "newtest@mail.com"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_user(user, @invalid_attrs)
      assert user = Account.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Account.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Account.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Account.change_user(user)
    end
  end
end
