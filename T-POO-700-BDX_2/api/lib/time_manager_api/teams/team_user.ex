defmodule TimeManagerApi.Teams.TeamUser do
  use Ecto.Schema
  import Ecto.Changeset

  schema "team_users" do
    field(:user_id, :id)
    field(:team_id, :id)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(team_user, attrs) do
    team_user
    |> cast(attrs, [:user_id, :team_id])
    |> validate_required([:user_id, :team_id])
    |> foreign_key_constraint(:team_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint([:user, :team],
      name: :user_id_team_id_unique_index,
      message: "ALREADY_EXISTS"
    )
  end
end
