defmodule TimeManagerApiWeb.ClockController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.TimeManager
  alias TimeManagerApi.TimeManager.Clock

  action_fallback(TimeManagerApiWeb.FallbackController)

  def create(conn, %{"user_id" => user_id}) do
    case TimeManager.get_clock_by_user_id(user_id) do
      nil ->
        {:ok, clock} =
          TimeManager.create_clock(%{
            user_id: user_id,
            status: true,
            time: DateTime.utc_now(:second)
          })

        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/clocks/#{clock}")
        |> render(:show, clock: clock)

      %Clock{status: true} = clock ->
        TimeManager.create_working_time(%{
          user_id: clock.user_id,
          start: clock.time,
          end: DateTime.utc_now(:second)
        })

        {:ok, updated_clock} =
          TimeManager.update_clock(clock, %{status: false})

        conn
        |> put_status(200)
        |> render(:show, clock: updated_clock)

      %Clock{} = clock ->
        {:ok, updated_clock} =
          TimeManager.update_clock(clock, %{status: true, time: DateTime.utc_now(:second)})

        conn
        |> put_status(200)
        |> render(:show, clock: updated_clock)
    end
  end

  def show(conn, %{"user_id" => user_id}) do
    clock = TimeManager.get_clock_by_user_id(user_id)
    render(conn, :show, clock: clock)
  end
end
