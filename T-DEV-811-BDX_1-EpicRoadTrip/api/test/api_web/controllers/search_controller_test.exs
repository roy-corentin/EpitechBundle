defmodule SearchControllerTest do
  use ApiWeb.ConnCase

  import Api.AccountFixtures

  setup %{conn: conn} do
    Api.Cache.clean_all_cache()
    {:ok, conn: conn}
  end

  describe "GET /enjoy" do
    test "return event/place of enjoyment", %{conn: conn} do
      conn = get(conn, ~p"/api/enjoy")
      assert json_response(conn, 200)["data"]["objects"]

      assert Enum.all?(json_response(conn, 200)["data"]["objects"], fn x ->
               Enum.member?(x["data"]["event"]["type"], "EntertainmentAndEvent")
             end)
    end
  end

  describe "GET /drink" do
    test "return event/place of drinking", %{conn: conn} do
      conn = get(conn, ~p"/api/drink")
      assert json_response(conn, 200)

      assert Enum.all?(json_response(conn, 200)["data"]["objects"], fn x ->
               Enum.member?(x["data"]["event"]["type"], "BarOrPub")
             end)
    end
  end

  describe "GET /eat" do
    test "return event/place of eating", %{conn: conn} do
      conn = get(conn, ~p"/api/eat")
      assert json_response(conn, 200)

      assert Enum.all?(json_response(conn, 200)["data"]["objects"], fn x ->
               Enum.member?(x["data"]["event"]["type"], "FoodEstablishment")
             end)
    end
  end

  describe "GET /sleep" do
    test "return event/place of sleeping", %{conn: conn} do
      conn = get(conn, ~p"/api/sleep")
      assert json_response(conn, 200)

      assert Enum.all?(json_response(conn, 200)["data"]["objects"], fn x ->
               Enum.member?(x["data"]["event"]["type"], "AccommodationProduct")
             end)
    end
  end

  describe "GET /travel" do
    test "return event/place of travelling", %{conn: conn} do
      conn = get(conn, ~p"/api/travel")
      assert json_response(conn, 200)

      assert Enum.all?(json_response(conn, 200)["data"]["objects"], fn x ->
               Enum.member?(x["data"]["event"]["type"], "TouristInformationCenter")
             end)
    end
  end
end
