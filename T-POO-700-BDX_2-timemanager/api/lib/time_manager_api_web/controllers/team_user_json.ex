defmodule TimeManagerApiWeb.TeamUserJSON do
  alias TimeManagerApi.Teams.TeamUser

  @doc """
  Renders a list of team_users.
  """
  def index(%{team_users: team_users}) do
    %{data: for(team_user <- team_users, do: data(team_user))}
  end

  @doc """
  Renders a single team_user.
  """
  def show(%{team_user: team_user}) do
    %{data: data(team_user)}
  end

  defp data(%TeamUser{} = team_user) do
    %{
      id: team_user.id
    }
  end
end
