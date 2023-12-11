defmodule TimeManagerApi.TimeManagerFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `TimeManagerApi.TimeManager` context.
  """

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end: ~N[2023-10-22 19:50:00],
        start: ~N[2023-10-22 19:50:00]
      })
      |> TimeManagerApi.TimeManager.create_working_time()

    working_time
  end

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-22 19:51:00]
      })
      |> TimeManagerApi.TimeManager.create_clock()

    clock
  end

  @doc """
  Generate a team.
  """
  def team_fixture(attrs \\ %{}) do
    {:ok, team} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> TimeManagerApi.TimeManager.create_team()

    team
  end
end
