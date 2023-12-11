defmodule TimeManagerApiWeb.WorkingTimeController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.TimeManager
  alias TimeManagerApi.TimeManager.WorkingTime
  alias TimeManagerApi.Account

  action_fallback(TimeManagerApiWeb.FallbackController)

  def index(conn, %{"user_id" => user_id, options}) do
    Account.user_exists!(user_id)

    workingtimes =
      TimeManager.find_user_workingtimes(user_id, options)

    render(conn, :index, workingtimes: workingtimes)
  end

  def index(conn, %{"user_id" => user_id}) do
    Account.user_exists!(user_id)
    workingtimes = TimeManager.list_user_workingtimes(user_id)
    render(conn, :index, workingtimes: workingtimes)
  end

  def create(conn, %{"user_id" => user_id, "workingtime" => working_time_params}) do
    Account.user_exists!(user_id)

    with {:ok, %WorkingTime{} = working_time} <-
           TimeManager.create_working_time(
             Map.merge(working_time_params, %{"user_id" => user_id})
           ) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/workingtimes/#{working_time}")
      |> render(:show, working_time: working_time)
    end
  end

  def show(conn, %{"user_id" => user_id, "id" => id}) do
    Account.user_exists!(user_id)
    working_time = TimeManager.get_working_time!(id)
    render(conn, :show, working_time: working_time)
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    working_time = TimeManager.get_working_time!(id)
    Account.get_user!(working_time_params["user_id"])

    with {:ok, %WorkingTime{} = working_time} <-
           TimeManager.update_working_time(working_time, working_time_params) do
      render(conn, :show, working_time: working_time)
    end
  end

  def delete(conn, %{"id" => id}) do
    working_time = TimeManager.get_working_time!(id)

    with {:ok, %WorkingTime{}} <- TimeManager.delete_working_time(working_time) do
      send_resp(conn, :no_content, "")
    end
  end
end
