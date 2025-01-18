defmodule ApiWeb.SearchController do
  import Plug.Conn

  use ApiWeb, :controller

  action_fallback(ApiWeb.FallbackController)

  use PhoenixSwagger

  def swagger_definitions do
    %{
      Object:
        swagger_schema do
          title("Object")
          description("An object of interest")

          properties do
            x(:float, "X coordinate", required: true, example: -0.7834)
            y(:float, "Y coordinate", required: true, example: 32.0974)

            data(
              :object,
              "Object data (enum: EntertainmentAndEvent, BarOrPub, FoodEstablishment, AccommodationProduct, TouristInformationCenter)",
              required: true,
              example: %{
                event: %{
                  type: "EntertainmentAndEvent"
                }
              }
            )
          end
        end,
      Objects:
        swagger_schema do
          title("Objects")
          description("A collection of objects of interest")
          type(:array)
          items(Schema.ref(:Object))
        end
    }
  end

  swagger_path :enjoy do
    get("/enjoy?maxX={maxX}&maxY={minY}&minX={minX}&minY={minY}")
    summary("Enjoy")
    description("List of existing events/activities for a given location")
    tag("Search")
    produces("application/json")

    parameters do
      minX(:query, :float, "Minimum x location", required: true, example: "-0.877634")
      minY(:query, :float, "Minimum y location", required: true, example: "43.834768")
      maxX(:query, :float, "Maximum x location", required: true, example: "-0.5603223")
      maxY(:query, :float, "Maximum y location", required: true, example: "45.765418")
    end

    response(200, "OK", Schema.ref(:Objects))
    response(400, :error)
  end

  @spec enjoy(Plug.Conn.t(), map) :: Plug.Conn.t()
  def enjoy(conn, params) do
    {:ok, cache_key} = params |> Map.put(:endpoint, "enjoy") |> Jsonrs.encode()

    json_objects =
      case Api.Cache.get_cache(cache_key) do
        {:ok, result} when result != nil ->
          result

        _ ->
          objects =
            tree_objects(params)
            |> Enum.filter(fn x -> Enum.member?(x.data.event.type, "EntertainmentAndEvent") end)

          {:ok, json_objects} = %{data: %{objects: objects}} |> Jsonrs.encode()
          Api.Cache.set_cache(cache_key, json_objects)
          json_objects
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_objects)
  end

  swagger_path :drink do
    get("/drink?maxX={maxX}&maxY={minY}&minX={minX}&minY={minY}")
    summary("Drink")
    description("List of existing bar/pubs")
    tag("Search")
    produces("application/json")

    parameters do
      minX(:query, :float, "Minimum x location", required: true, example: "-0.877634")
      minY(:query, :float, "Minimum y location", required: true, example: "43.834768")
      maxX(:query, :float, "Maximum x location", required: true, example: "-0.5603223")
      maxY(:query, :float, "Maximum y location", required: true, example: "45.765418")
    end

    response(200, "OK", Schema.ref(:Objects))
    response(400, :error)
  end

  def drink(conn, params) do
    {:ok, cache_key} = params |> Map.put(:endpoint, "drink") |> Jsonrs.encode()

    json_objects =
      case Api.Cache.get_cache(cache_key) do
        {:ok, result} when result != nil ->
          result

        _ ->
          objects =
            tree_objects(params)
            |> Enum.filter(fn x -> Enum.member?(x.data.event.type, "BarOrPub") end)

          {:ok, json_objects} = %{data: %{objects: objects}} |> Jsonrs.encode()
          Api.Cache.set_cache(cache_key, json_objects)
          json_objects
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_objects)
  end

  swagger_path :eat do
    get("/eat?maxX={maxX}&maxY={minY}&minX={minX}&minY={minY}")
    summary("Eat")
    description("List of existing restaurants")
    tag("Search")
    produces("application/json")

    parameters do
      minX(:query, :float, "Minimum x location", required: true, example: "-0.877634")
      minY(:query, :float, "Minimum y location", required: true, example: "43.834768")
      maxX(:query, :float, "Maximum x location", required: true, example: "-0.5603223")
      maxY(:query, :float, "Maximum y location", required: true, example: "45.765418")
    end

    response(200, "OK", Schema.ref(:Objects))
    response(400, :error)
  end

  def eat(conn, params) do
    {:ok, cache_key} = params |> Map.put(:endpoint, "eat") |> Jsonrs.encode()

    json_objects =
      case Api.Cache.get_cache(cache_key) do
        {:ok, result} when result != nil ->
          result

        _ ->
          objects =
            tree_objects(params)
            |> Enum.filter(fn x -> Enum.member?(x.data.event.type, "FoodEstablishment") end)

          {:ok, json_objects} = %{data: %{objects: objects}} |> Jsonrs.encode()
          Api.Cache.set_cache(cache_key, json_objects)
          json_objects
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_objects)
  end

  swagger_path :sleep do
    get("/sleep?maxX={maxX}&maxY={minY}&minX={minX}&minY={minY}")
    summary("Sleep")
    description("List of existing accomodations")
    tag("Search")
    produces("application/json")

    parameters do
      minX(:query, :float, "Minimum x location", required: true, example: "-0.877634")
      minY(:query, :float, "Minimum y location", required: true, example: "43.834768")
      maxX(:query, :float, "Maximum x location", required: true, example: "-0.5603223")
      maxY(:query, :float, "Maximum y location", required: true, example: "45.765418")
    end

    response(200, "OK", Schema.ref(:Objects))
    response(400, :error)
  end

  def sleep(conn, params) do
    {:ok, cache_key} = params |> Map.put(:endpoint, "sleep") |> Jsonrs.encode()

    json_objects =
      case Api.Cache.get_cache(cache_key) do
        {:ok, result} when result != nil ->
          result

        _ ->
          objects =
            tree_objects(params)
            |> Enum.filter(fn x -> Enum.member?(x.data.event.type, "AccommodationProduct") end)

          {:ok, json_objects} = %{data: %{objects: objects}} |> Jsonrs.encode()
          Api.Cache.set_cache(cache_key, json_objects)
          json_objects
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_objects)
  end

  swagger_path :travel do
    get("/travel?maxX={maxX}&maxY={minY}&minX={minX}&minY={minY}")
    summary("Travel")
    description("List of existing tourists information centers")
    tag("Search")
    produces("application/json")

    parameters do
      minX(:query, :float, "Minimum x location", required: true, example: "-0.877634")
      minY(:query, :float, "Minimum y location", required: true, example: "43.834768")
      maxX(:query, :float, "Maximum x location", required: true, example: "-0.5603223")
      maxY(:query, :float, "Maximum y location", required: true, example: "45.765418")
    end

    response(200, "OK", Schema.ref(:Objects))
    response(400, :error)
  end

  def travel(conn, params) do
    {:ok, cache_key} = params |> Map.put(:endpoint, "travel") |> Jsonrs.encode()

    json_objects =
      case Api.Cache.get_cache(cache_key) do
        {:ok, result} when result != nil ->
          result

        _ ->
          objects =
            tree_objects(params)
            |> Enum.filter(fn x -> Enum.member?(x.data.event.type, "TouristInformationCenter") end)

          {:ok, json_objects} = %{data: %{objects: objects}} |> Jsonrs.encode()
          Api.Cache.set_cache(cache_key, json_objects)
          json_objects
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_objects)
  end

  defp tree_objects(%{
         "minX" => min_x,
         "minY" => min_y,
         "maxX" => max_x,
         "maxY" => max_y
       }) do
    {min_y, _} = Float.parse(min_y)
    {min_x, _} = Float.parse(min_x)
    {max_y, _} = Float.parse(max_y)
    {max_x, _} = Float.parse(max_x)

    boundingBox = %RBoundingBox{
      min_y: min_y,
      min_x: min_x,
      max_y: max_y,
      max_x: max_x,
      area: 1000
    }

    Api.RTree.get()
    |> RTree.search(boundingBox)
  end

  defp tree_objects(_params) do
    Api.RTree.get()
    |> extract_objects()
  end

  @spec extract_objects(%RNode{}) :: list(%{type: list(charlist())})
  defp extract_objects(event) do
    case event.children do
      nil -> event.objects
      _ -> extract_objects(event.children.left) ++ extract_objects(event.children.right)
    end
  end
end
