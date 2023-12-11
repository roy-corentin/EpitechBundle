defmodule TimeManagerApiWeb.TeamUserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Teams
  alias TimeManagerApi.Teams.TeamUser

  action_fallback(TimeManagerApiWeb.FallbackController)

  def create(conn, %{"team_id" => team_id, "user_id" => user_id}) do
    with {:ok, %TeamUser{} = team_user} <-
           Teams.create_team_user(%{team_id: team_id, user_id: user_id}) do
      conn
      |> put_status(:created)
      |> render(:show, team_user: team_user)
    end
  end

  def delete(conn, %{"team_id" => team_id, "user_id" => user_id}) do
    team_user = Teams.get_team_user_by_team_id_and_user_id!(team_id, user_id)

    with {:ok, %TeamUser{}} <- Teams.delete_team_user(team_user) do
      send_resp(conn, :no_content, "")
    end
  end
end
