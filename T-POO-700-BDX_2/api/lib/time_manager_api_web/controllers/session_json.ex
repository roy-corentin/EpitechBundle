defmodule TimeManagerApiWeb.SessionJSON do
  alias TimeManagerApi.Account.User

  @doc """
  Renders user token
  """
  def jwt(%{token: token, user: user}) do
    %{
      token: token,
      user: %{
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        team_ids: User.team_ids(user),
        managed_team_ids: User.managed_team_ids(user)
      }
    }
  end

  def me(%{user: user}) do
    %{
      user: %{
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        team_ids: User.team_ids(user),
        managed_team_ids: User.managed_team_ids(user)
      }
    }
  end
end
