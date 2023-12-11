defmodule TimeManagerApi.Repo.Migrations.CreateTeamUsers do
  use Ecto.Migration

  def change do
    create table(:team_users) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :team_id, references(:teams, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:team_users, [:user_id, :team_id])
  end
end
