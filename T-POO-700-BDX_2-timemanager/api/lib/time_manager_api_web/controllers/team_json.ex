defmodule TimeManagerApiWeb.TeamJSON do
  alias TimeManagerApi.Teams.Team

  @doc """
  Renders a list of teams.
  """
  def index(%{teams: teams}) do
    %{data: for(team <- teams, do: data(team))}
  end

  @doc """
  Renders a single team.
  """
  def show(%{team: team}) do
    %{data: data(team)}
  end

  defp data(%Team{} = team) do
    %{
      id: team.id,
      name: team.name,
      manager: Team.show_manager(team),
      members: Team.show_users(team).data
    }
  end
end
