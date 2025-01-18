defmodule EventParser do
  alias Jason
  alias RTree
  alias RNode
  alias RObject
  import EventLooker

  def parse_all(tree = %RNode{}) do
    tree
    |> call("priv/repo/events/accurate_events.json")
    |> call("priv/repo/events/accurate_places_06.json")
    |> call("priv/repo/events/accurate_places_13.json")
    |> call("priv/repo/events/accurate_places_17.json")
    |> call("priv/repo/events/accurate_places_31.json")
    |> call("priv/repo/events/accurate_places_33.json")
    |> call("priv/repo/events/accurate_places_34.json")
    |> call("priv/repo/events/accurate_places_44.json")
    |> call("priv/repo/events/accurate_places_49.json")
    |> call("priv/repo/events/accurate_places_59.json")
    |> call("priv/repo/events/accurate_places_67.json")
    |> call("priv/repo/events/accurate_places_69.json")
    |> call("priv/repo/events/accurate_places_75.json")
    |> call("priv/repo/events/accurate_places_77.json")
    |> call("priv/repo/events/accurate_places_91.json")
    |> call("priv/repo/events/accurate_places_94.json")
  end

  @spec call(%RNode{}, String.t()) :: %RNode{}
  def call(tree, input_path) do
    case File.read(input_path) do
      {:ok, file} ->
        IO.puts("Reading file #{input_path}...")

        file
        |> Jsonrs.decode!()
        |> parse_events()
        |> Enum.reduce(tree, fn object, node -> node |> RTree.insert(object) end)

      _ ->
        IO.puts("Not found #{input_path}")
        tree
    end
  end

  defp parse_events(events) when is_list(events) do
    Enum.map(events, &parse_event/1) |> Enum.filter(&(&1 != nil))
  end

  defp parse_event(event) do
    description =
      case find_first_nested_values(event, ["shortDescription", "dc:description", "rdfs:comment"]) do
        nil ->
          nil

        comments when is_list(comments) ->
          comments
          |> Enum.map(& &1["@value"])
          |> Enum.join(" ")

        comment when is_map(comment) ->
          Map.get(comment, "@value", "\n")

        description ->
          description
      end

    case find_nested_values(event, ["schema:longitude", "schema:latitude"]) do
      [nil, _] ->
        nil

      [_, nil] ->
        nil

      [longitude, latitude] ->
        %RObject{
          x: Float.parse(longitude) |> elem(0),
          y: Float.parse(latitude) |> elem(0),
          data: %{
            event: %{
              type: get_in(event, [Access.key("@type")]),
              label: find_nested_value(event, "rdfs:label"),
              description: description,
              petsAllowed: find_nested_value(event, "petsAllowed"),
              link: find_nested_value(event, "foaf:homepage")
            },
            hourly: %{
              open: find_nested_value(event, "schema:opens"),
              closes: find_nested_value(event, "schema:closes"),
              day: find_nested_value(event, "schema:dayOfWeek"),
              endDate: find_nested_value(event, "schema:endDate"),
              startDate: find_nested_value(event, "schema:startDate")
            },
            address: %{
              city: find_nested_value(event, "schema:addressLocality"),
              postalCode: find_nested_value(event, "schema:postalCode"),
              streetAddress: find_nested_value(event, "schema:streetAddress"),
              department: find_nested_value(event, "isPartOfDepartment"),
              region: find_nested_value(event, "isPartOfRegion"),
              country: find_nested_value(event, "isPartOfCountry")
            },
            priceSpecification: %{
              price: find_nested_value(event, "schema:price"),
              currency: find_nested_value(event, "schema:priceCurrency")
            }
          }
        }
    end
  end
end
