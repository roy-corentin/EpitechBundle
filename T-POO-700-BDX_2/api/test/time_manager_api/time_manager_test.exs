defmodule TimeManagerApi.TimeManagerTest do
  use TimeManagerApi.DataCase

  alias TimeManagerApi.TimeManager

  describe "workingtimes" do
    alias TimeManagerApi.TimeManager.WorkingTime

    import TimeManagerApi.TimeManagerFixtures

    @invalid_attrs %{start: nil, end: nil}

    test "list_workingtimes/0 returns all workingtimes" do
      working_time = working_time_fixture()
      assert TimeManager.list_workingtimes() == [working_time]
    end

    test "get_working_time!/1 returns the working_time with given id" do
      working_time = working_time_fixture()
      assert TimeManager.get_working_time!(working_time.id) == working_time
    end

    test "create_working_time/1 with valid data creates a working_time" do
      valid_attrs = %{start: ~N[2023-10-22 19:50:00], end: ~N[2023-10-22 19:50:00]}

      assert {:ok, %WorkingTime{} = working_time} = TimeManager.create_working_time(valid_attrs)
      assert working_time.start == ~N[2023-10-22 19:50:00]
      assert working_time.end == ~N[2023-10-22 19:50:00]
    end

    test "create_working_time/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_working_time(@invalid_attrs)
    end

    test "update_working_time/2 with valid data updates the working_time" do
      working_time = working_time_fixture()
      update_attrs = %{start: ~N[2023-10-23 19:50:00], end: ~N[2023-10-23 19:50:00]}

      assert {:ok, %WorkingTime{} = working_time} = TimeManager.update_working_time(working_time, update_attrs)
      assert working_time.start == ~N[2023-10-23 19:50:00]
      assert working_time.end == ~N[2023-10-23 19:50:00]
    end

    test "update_working_time/2 with invalid data returns error changeset" do
      working_time = working_time_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_working_time(working_time, @invalid_attrs)
      assert working_time == TimeManager.get_working_time!(working_time.id)
    end

    test "delete_working_time/1 deletes the working_time" do
      working_time = working_time_fixture()
      assert {:ok, %WorkingTime{}} = TimeManager.delete_working_time(working_time)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_working_time!(working_time.id) end
    end

    test "change_working_time/1 returns a working_time changeset" do
      working_time = working_time_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_working_time(working_time)
    end
  end

  describe "clocks" do
    alias TimeManagerApi.TimeManager.Clock

    import TimeManagerApi.TimeManagerFixtures

    @invalid_attrs %{status: nil, time: nil}

    test "list_clocks/0 returns all clocks" do
      clock = clock_fixture()
      assert TimeManager.list_clocks() == [clock]
    end

    test "get_clock!/1 returns the clock with given id" do
      clock = clock_fixture()
      assert TimeManager.get_clock!(clock.id) == clock
    end

    test "create_clock/1 with valid data creates a clock" do
      valid_attrs = %{status: true, time: ~N[2023-10-22 19:51:00]}

      assert {:ok, %Clock{} = clock} = TimeManager.create_clock(valid_attrs)
      assert clock.status == true
      assert clock.time == ~N[2023-10-22 19:51:00]
    end

    test "create_clock/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_clock(@invalid_attrs)
    end

    test "update_clock/2 with valid data updates the clock" do
      clock = clock_fixture()
      update_attrs = %{status: false, time: ~N[2023-10-23 19:51:00]}

      assert {:ok, %Clock{} = clock} = TimeManager.update_clock(clock, update_attrs)
      assert clock.status == false
      assert clock.time == ~N[2023-10-23 19:51:00]
    end

    test "update_clock/2 with invalid data returns error changeset" do
      clock = clock_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_clock(clock, @invalid_attrs)
      assert clock == TimeManager.get_clock!(clock.id)
    end

    test "delete_clock/1 deletes the clock" do
      clock = clock_fixture()
      assert {:ok, %Clock{}} = TimeManager.delete_clock(clock)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_clock!(clock.id) end
    end

    test "change_clock/1 returns a clock changeset" do
      clock = clock_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_clock(clock)
    end
  end

  describe "teams" do
    alias TimeManagerApi.Teams.Team

    import TimeManagerApi.TimeManagerFixtures

    @invalid_attrs %{name: nil}

    test "list_teams/0 returns all teams" do
      team = team_fixture()
      assert TimeManager.list_teams() == [team]
    end

    test "get_team!/1 returns the team with given id" do
      team = team_fixture()
      assert TimeManager.get_team!(team.id) == team
    end

    test "create_team/1 with valid data creates a team" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %Team{} = team} = TimeManager.create_team(valid_attrs)
      assert team.name == "some name"
    end

    test "create_team/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_team(@invalid_attrs)
    end

    test "update_team/2 with valid data updates the team" do
      team = team_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %Team{} = team} = TimeManager.update_team(team, update_attrs)
      assert team.name == "some updated name"
    end

    test "update_team/2 with invalid data returns error changeset" do
      team = team_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_team(team, @invalid_attrs)
      assert team == TimeManager.get_team!(team.id)
    end

    test "delete_team/1 deletes the team" do
      team = team_fixture()
      assert {:ok, %Team{}} = TimeManager.delete_team(team)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_team!(team.id) end
    end

    test "change_team/1 returns a team changeset" do
      team = team_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_team(team)
    end
  end
end
