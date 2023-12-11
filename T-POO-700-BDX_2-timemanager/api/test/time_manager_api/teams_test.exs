defmodule TimeManagerApi.TeamsTest do
  use TimeManagerApi.DataCase

  alias TimeManagerApi.Teams

  describe "team_users" do
    alias TimeManagerApi.Teams.TeamUser

    import TimeManagerApi.TeamsFixtures

    @invalid_attrs %{}

    test "list_team_users/0 returns all team_users" do
      team_user = team_user_fixture()
      assert Teams.list_team_users() == [team_user]
    end

    test "get_team_user!/1 returns the team_user with given id" do
      team_user = team_user_fixture()
      assert Teams.get_team_user!(team_user.id) == team_user
    end

    test "create_team_user/1 with valid data creates a team_user" do
      valid_attrs = %{}

      assert {:ok, %TeamUser{} = team_user} = Teams.create_team_user(valid_attrs)
    end

    test "create_team_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Teams.create_team_user(@invalid_attrs)
    end

    test "update_team_user/2 with valid data updates the team_user" do
      team_user = team_user_fixture()
      update_attrs = %{}

      assert {:ok, %TeamUser{} = team_user} = Teams.update_team_user(team_user, update_attrs)
    end

    test "update_team_user/2 with invalid data returns error changeset" do
      team_user = team_user_fixture()
      assert {:error, %Ecto.Changeset{}} = Teams.update_team_user(team_user, @invalid_attrs)
      assert team_user == Teams.get_team_user!(team_user.id)
    end

    test "delete_team_user/1 deletes the team_user" do
      team_user = team_user_fixture()
      assert {:ok, %TeamUser{}} = Teams.delete_team_user(team_user)
      assert_raise Ecto.NoResultsError, fn -> Teams.get_team_user!(team_user.id) end
    end

    test "change_team_user/1 returns a team_user changeset" do
      team_user = team_user_fixture()
      assert %Ecto.Changeset{} = Teams.change_team_user(team_user)
    end
  end
end
