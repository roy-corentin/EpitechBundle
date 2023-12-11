defmodule TimeManagerApi.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias TimeManagerApi.Repo
  alias TimeManagerApi.Teams.Team

  schema "users" do
    field(:username, :string)
    field(:email, :string)
    field(:password, :string)

    field(:role, Ecto.Enum, values: [:manager, :employee, :administrator])

    has_one(:clock, TimeManagerApi.TimeManager.Clock)
    has_many(:working_times, TimeManagerApi.TimeManager.WorkingTime)

    many_to_many(:teams, TimeManagerApi.Teams.Team, join_through: TimeManagerApi.Teams.TeamUser)
    has_many(:managed_teams, TimeManagerApi.Teams.Team, foreign_key: :manager_id)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :username, :role, :password])
    |> validate_required([:email, :username, :password])
    |> validate_format(:email, ~r/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
    |> validate_confirmation(:password, message: "does not match password!")
    |> put_hash_password(attrs)
  end

  defp put_hash_password(changeset, %{"password" => password} = _attrs) do
    put_change(changeset, :password, Bcrypt.hash_pwd_salt(password))
  end

  defp put_hash_password(changeset, _attrs) do
    changeset
  end

  def team_ids(user) do
    user
    |> Repo.preload(:teams)
    |> Map.get(:teams)
    |> Enum.map(& &1.id)
  end

  def managed_team_ids(user) do
    user
    |> Repo.preload(:managed_teams)
    |> Map.get(:managed_teams)
    |> Enum.map(& &1.id)
  end

  def manage_this_team?(user, team_id) do
    team_id_int = String.to_integer(team_id)
    Enum.member?(managed_team_ids(user), team_id_int)
  end

  def managed_users(user) do
    user
    |> Repo.preload(:managed_teams)
    |> Map.get(:managed_teams)
    |> Enum.flat_map(fn team -> Team.member_ids(team) end)
  end

  def manage_this_user?(user, target_user_id) do
    target_user_id_int = String.to_integer(target_user_id)
    IO.inspect(managed_users(user))
    Enum.member?(managed_users(user), target_user_id_int)
  end
end
