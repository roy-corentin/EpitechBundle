defmodule TimeManagerApi.TimeManager.WorkingTime do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field(:start, :utc_datetime)
    field(:end, :utc_datetime)

    belongs_to(:user, TimeManagerApi.Account.User)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:user_id, :start, :end])
    |> validate_required([:user_id, :start, :end])
  end
end
