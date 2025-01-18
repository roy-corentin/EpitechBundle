defmodule EventLooker do
  def find_nested_values(value, keys) do
    Enum.map(keys, fn key -> find_nested_value(value, key) end)
  end

  def find_first_nested_values(value, keys) do
    Enum.reduce(keys, nil, fn key, acc ->
      case acc do
        nil -> find_nested_value(value, key)
        _ -> acc
      end
    end)
  end

  def find_nested_value(value, key) when is_map(value) do
    case Map.fetch(value, key) do
      {:ok, %{"rdfs:label" => %{"@value" => label_value}}} ->
        label_value

      {:ok, %{"rdfs:label" => label_map}} when is_map(label_map) ->
        Map.get(label_map, "@value")

      {:ok, %{"@value" => subvalue}} ->
        subvalue

      {:ok, subvalue} ->
        subvalue

      :error ->
        value
        |> Map.values()
        |> Enum.reduce_while(nil, fn v, acc ->
          case acc do
            nil -> {:cont, find_nested_value(v, key)}
            _ -> {:halt, acc}
          end
        end)
    end
  end

  def find_nested_value(value, key) when is_list(value) do
    Enum.reduce_while(value, nil, fn v, acc ->
      case acc do
        nil -> {:cont, find_nested_value(v, key)}
        _ -> {:halt, acc}
      end
    end)
  end

  def find_nested_value(_, _), do: nil
end
