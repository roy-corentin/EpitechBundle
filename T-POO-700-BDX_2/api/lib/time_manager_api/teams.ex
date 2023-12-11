defmodule TimeManagerApi.Teams do
  @moduledoc """
  The Teams context.
  """

  import Ecto.Query, warn: false
  alias TimeManagerApi.Repo

  alias TimeManagerApi.Teams.TeamUser

  @doc """
  Returns the list of team_users.

  ## Examples

      iex> list_team_users()
      [%TeamUser{}, ...]

  """
  def list_team_users do
    Repo.all(TeamUser)
  end

  @doc """
  Gets a single team_user.

  Raises `Ecto.NoResultsError` if the Team user does not exist.

  ## Examples

      iex> get_team_user!(123)
      %TeamUser{}

      iex> get_team_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_team_user!(id), do: Repo.get!(TeamUser, id)

  def get_team_user_by_team_id_and_user_id!(team_id, user_id) do
    Repo.one(
      from(team_user in TeamUser,
        where: team_user.team_id == ^team_id and team_user.user_id == ^user_id,
        select: team_user
      )
    )
  end

  @doc """
  Creates a team_user.

  ## Examples

      iex> create_team_user(%{field: value})
      {:ok, %TeamUser{}}

      iex> create_team_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_team_user(attrs \\ %{}) do
    %TeamUser{}
    |> TeamUser.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a team_user.

  ## Examples

      iex> update_team_user(team_user, %{field: new_value})
      {:ok, %TeamUser{}}

      iex> update_team_user(team_user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_team_user(%TeamUser{} = team_user, attrs) do
    team_user
    |> TeamUser.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a team_user.

  ## Examples

      iex> delete_team_user(team_user)
      {:ok, %TeamUser{}}

      iex> delete_team_user(team_user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_team_user(%TeamUser{} = team_user) do
    Repo.delete(team_user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking team_user changes.

  ## Examples

      iex> change_team_user(team_user)
      %Ecto.Changeset{data: %TeamUser{}}

  """
  def change_team_user(%TeamUser{} = team_user, attrs \\ %{}) do
    TeamUser.changeset(team_user, attrs)
  end
end
