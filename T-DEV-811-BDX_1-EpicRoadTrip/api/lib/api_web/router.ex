defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, html: {ApiWeb.Layouts, :root})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", ApiWeb do
    pipe_through(:browser)

    get("/", PageController, :home)
  end

  scope "/api", ApiWeb do
    pipe_through(:api)

    post("/sign_in", SessionController, :sign_in)
    post("/sign_up", SessionController, :sign_up)
    get("/enjoy", SearchController, :enjoy)
    get("/drink", SearchController, :drink)
    get("/eat", SearchController, :eat)
    get("/sleep", SearchController, :sleep)
    get("/travel", SearchController, :travel)
  end

  # Enable Swoosh mailbox preview in development
  if Application.compile_env(:api, :dev_routes) do
    scope "/dev" do
      pipe_through(:browser)

      forward("/mailbox", Plug.Swoosh.MailboxPreview)
    end
  end

  scope "/api/swagger" do
    forward("/", PhoenixSwagger.Plug.SwaggerUI,
      otp_app: :api,
      swagger_file: "swagger.json"
    )
  end

  def swagger_info do
    %{
      swagger: "2.0",
      info: %{
        version: "1.0",
        title: "Epic Road Trip"
      },
      tags: [
        %{
          name: "Search",
          description: "Related to the searches (places to enjoy, drink, eat, sleep, and travel)"
        },
        %{
          name: "User (Account & Session)",
          description: "Related to the user account and session"
        }
      ],
      basePath: "/api"
    }
  end
end
