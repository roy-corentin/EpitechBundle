defmodule Api.RTree do
  @var_name :rtree

  def initialize do
    Application.put_env(:app, @var_name, %RNode{limit: 7} |> EventParser.parse_all())
  end

  def get do
    Application.get_env(:app, @var_name)
  end
end
