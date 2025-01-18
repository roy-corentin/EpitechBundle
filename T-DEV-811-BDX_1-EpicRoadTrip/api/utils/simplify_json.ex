defmodule Main do
  import EventLooker

  def main do
    input_path = "priv/repo/events/lieux.json"
    output_path = "priv/repo/events/accurate_places.json"
    IO.puts("\"#{input_path}\" Reducing events...")
    reduce_call(input_path, output_path, "33")
    IO.puts("Done! In \"#{output_path}\" file")
  end

  # Create json file with current info from initial file
  def reduce_call(input_path, output_path) do
    case input_path
         |> File.read() do
      {:ok, file} ->
        file
        |> Jsonrs.decode!()
        |> filter_events
        |> Jsonrs.encode!()
        |> write_to_file(output_path)

      _ ->
        nil
    end
  end

  defp filter_events(%{"@graph" => events}) do
    Enum.filter(events, &valid_event?/1)
  end

  defp valid_event?(event) do
    case find_nested_value(event, "schema:endDate") do
      nil ->
        case find_nested_value(event, "endDate") do
          nil -> true
          end_date when is_binary(end_date) -> String.contains?(end_date, "2024")
        end

      end_date when is_binary(end_date) ->
        String.contains?(end_date, "2024")

      _ ->
        false
    end
  end

  def reduce_call(input_path, output_path, postalCode) do
    input_path
    |> File.read!()
    |> Jsonrs.decode!()
    |> reduce_place(postalCode)
    |> Jsonrs.encode!()
    |> write_to_file(output_path)
  end

  defp reduce_place(%{"@graph" => places}, postalCode) do
    Enum.filter(places, &current_place?(&1, postalCode))
  end

  defp current_place?(place, postalCode) do
    case find_nested_value(place, "schema:postalCode") do
      nil -> false
      postal_code when is_binary(postal_code) -> String.starts_with?(postal_code, postalCode)
      _ -> false
    end
  end

  defp write_to_file(data, path) do
    File.write!(path, data)
  end
end

Main.main()
