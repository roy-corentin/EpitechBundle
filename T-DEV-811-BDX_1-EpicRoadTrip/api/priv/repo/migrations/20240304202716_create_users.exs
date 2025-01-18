defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, unique: true
      add :email, :string, unique: true
      add :password_hash, :string, unique: true

      timestamps(type: :utc_datetime)
    end

    create unique_index(:users, [:email])
  end
end
