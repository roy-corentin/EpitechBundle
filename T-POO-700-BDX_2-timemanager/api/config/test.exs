import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :time_manager_api, TimeManagerApi.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "time_manager_api_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :time_manager_api, TimeManagerApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "5AuXObaKczdmpjR1NWhRAKzbIBvNjAAWrxJtVc6SMdrDL/y0TBQBXAP78pB7q8Fm",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
