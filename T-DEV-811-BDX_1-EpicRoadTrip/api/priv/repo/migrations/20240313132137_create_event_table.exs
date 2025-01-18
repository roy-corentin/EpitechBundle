defmodule Api.Repo.Migrations.CreateEventTable do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :type, :string
      add :label, :string
      add :description, :string
      add :audience, :string
      add :pets_allowed, :boolean
      add :link, :string

      add :open, :time
      add :closes, :time
      add :day, :string
      add :start_date, :date
      add :end_date, :date

      add :city, :string
      add :postal_code, :string
      add :street_address, :string
      add :department, :string
      add :region, :string
      add :country, :string
      add :latitude, :float
      add :longitude, :float

      add :price, :decimal
      add :curency, :string
      add :price_audience, :string

      timestamps()
    end
  end
end
