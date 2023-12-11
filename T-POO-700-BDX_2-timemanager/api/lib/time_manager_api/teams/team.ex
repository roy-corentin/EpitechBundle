defmodule TimeManagerApi.Teams.Team do
  use Ecto.Schema
  import Ecto.Changeset

  alias TimeManagerApi.Account.User
  alias TimeManagerApi.Repo

  schema "teams" do
    field(:name, :string)

    belongs_to(:manager, TimeManagerApi.Account.User)
    many_to_many(:users, TimeManagerApi.Account.User, join_through: TimeManagerApi.Teams.TeamUser)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :manager_id])
    |> validate_required([:name, :manager_id])
    |> unique_constraint(:name)
  end

  def show_manager(team) do
    team
    |> Repo.preload(:manager)
    |> show_loaded_manager()
  end

  def member_ids(team) do
    team
    |> Repo.preload(:users)
    |> Map.get(:users)
    |> Enum.map(& &1.id)
  end

  defp show_loaded_manager(team) do
    case team.manager do
      nil ->
        nil

      _ ->
        %{
          id: team.manager.id,
          username: team.manager.username,
          email: team.manager.email,
          role: team.manager.role,
          team_ids: User.team_ids(team.manager)
        }
    end
  end

  def show_users(team) do
    team
    |> Repo.preload(:users)
    |> show_loaded_users()
  end

  defp show_loaded_users(team) do
    %{
      data:
        for(
          user <- team.users,
          do: %{
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            team_ids: User.team_ids(user),
            managed_team_ids: User.managed_team_ids(user)
          }
        )
    }
  end
end
