defmodule TimeManagerApi.TimeManager.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field(:status, :boolean, default: false)
    field(:time, :utc_datetime)

    belongs_to(:user, TimeManagerApi.Account.User)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:user_id, :time, :status])
    |> validate_required([:user_id, :time, :status])
  end
end
