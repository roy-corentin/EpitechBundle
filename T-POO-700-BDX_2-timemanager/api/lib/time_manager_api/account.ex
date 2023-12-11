defmodule TimeManagerApi.Account do
  @moduledoc """
  The Account context.
  """

  import Ecto.Query, warn: false
  alias Hex.API.User
  alias TimeManagerApi.Repo

  alias TimeManagerApi.Account.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Find a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> find_user!(123)
      %User{}

      iex> find_user!(456)
      ** (Ecto.NoResultsError)

  """
  def find_user_by_email_username!(email, username) do
    Repo.all(
      from(u in User,
        where: ilike(u.username, ^"%#{username}%") or ilike(u.email, ^"%#{email}%"),
        select: u
      )
    )
  end

  def find_users_by_username!(username) do
    Repo.all(
      from(u in User,
        where: ilike(u.username, ^"%#{username}%"),
        select: u
      )
    )
  end

  def find_user_by_email!(email) do
    Repo.all(
      from(
        u in User,
        where: ilike(u.email, ^"%#{email}%"),
        select: u
      )
    )
  end

  @doc """
  Returns if user does exist or not.

  ## Examples

      iex> user_exists(1)
      true/false

  """
  def user_exists!(user_id) do
    Repo.exists?(from(u in "users", where: u.id == ^String.to_integer(user_id)))
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
  Return a User
  """
  def authenticate_user(email, password) do
    user = Repo.get_by!(User, email: email)

    case Bcrypt.verify_pass(password, user.password) do
      true -> {:ok, user}
      false -> {:error, :unauthorized}
    end
  end
end
