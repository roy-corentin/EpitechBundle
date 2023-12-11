defmodule TimeManagerApi.Token do
  @signing_salt "timemanagerapi"
  # 30 days
  @token_age_specs 30 * 24 * 60 * 60 * 1000

  def sign(data) do
    token =
      Phoenix.Token.sign(TimeManagerApiWeb.Endpoint, @signing_salt, data,
        max_age: @token_age_specs
      )

    {:ok, token}
  end

  def verify(token) do
    case Phoenix.Token.verify(TimeManagerApiWeb.Endpoint, @signing_salt, token,
           max_age: @token_age_specs
         ) do
      {:ok, data} -> {:ok, data}
      _error -> {:error, :unauthenticated}
    end
  end
end
