defmodule TimeManagerApiWeb.Router do
  use TimeManagerApiWeb, :router

  alias TimeManagerApiWeb

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :authenticated do
    plug(TimeManagerApi.Authenticate)
  end

  pipeline :team_permission do
    plug(TimeManagerApi.TeamPermission)
  end

  pipeline :default_permission do
    plug(TimeManagerApi.DefaultPermission)
  end

  pipeline :administrator_permission do
    plug(TimeManagerApi.AdministratorPermission)
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through(:api)

    post("/sign_in", SessionController, :sign_in)
    post("/sign_up", SessionController, :sign_up)
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through([:api, :authenticated, :default_permission])

    resources("/users", UserController, except: [:create, :delete])

    resources("/workingtimes", WorkingTimeController, only: [:update, :delete])
    get("/workingtimes/:user_id", WorkingTimeController, :index)
    get("/workingtimes/:user_id/:id", WorkingTimeController, :show)
    post("/workingtimes/:user_id", WorkingTimeController, :create)

    get("/clocks/:user_id", ClockController, :show)
    post("/clocks/:user_id", ClockController, :create)

    get("/me", SessionController, :me)
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through([:api, :authenticated, :team_permission])

    post("/team_user/:team_id/assign/:user_id", TeamUserController, :create)
    delete("/team_user/:team_id/unassign/:user_id", TeamUserController, :delete)

    resources("/teams", TeamController, except: [:create, :delete])
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through([:api, :authenticated, :administrator_permission])

    resources("/users", UserController, only: [:create, :delete])
    resources("/teams", TeamController, only: [:create, :delete])
  end
end
