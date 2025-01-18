defmodule ApiWeb.SessionJSON do
  @doc """
  Renders user
  """
  def user(%{user: user}) do
    %{
      data: %{
        user: %{
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    }
  end
end
