defmodule TimeManagerApiWeb.MessageErrorJSON do
  def error(%{message: message}) do
    %{error: message}
  end
end
