import { MapBounds } from "../domain/MapBounds";

export interface PointOfInterestApiInterface {
  enjoy(MapBbounds: MapBounds): Promise<Response>;
  eat(MapBbounds: MapBounds): Promise<Response>;
  drink(MapBbounds: MapBounds): Promise<Response>;
  sleep(MapBbounds: MapBounds): Promise<Response>;
  travel(MapBbounds: MapBounds): Promise<Response>;
}

export class PointOfInteresteApi implements PointOfInterestApiInterface {
  async enjoy(bounds: MapBounds): Promise<Response> {
    const url = new URL("http://localhost:4000/api/enjoy");
    this.setParams(url, bounds);

    const response = await fetch(url, { method: "GET" });
    return response;
  }

  async eat(bounds: MapBounds): Promise<Response> {
    const url = new URL("http://localhost:4000/api/eat");
    this.setParams(url, bounds);

    const response = await fetch(url, { method: "GET" });
    return response;
  }

  async drink(bounds: MapBounds): Promise<Response> {
    const url = new URL("http://localhost:4000/api/drink");
    this.setParams(url, bounds);

    const response = await fetch(url, { method: "GET" });
    return response;
  }

  async sleep(bounds: MapBounds): Promise<Response> {
    const url = new URL("http://localhost:4000/api/sleep");
    this.setParams(url, bounds);

    const response = await fetch(url, { method: "GET" });
    return response;
  }

  async travel(bounds: MapBounds): Promise<Response> {
    const url = new URL("http://localhost:4000/api/travel");
    this.setParams(url, bounds);

    const response = await fetch(url, { method: "GET" });
    return response;
  }

  private setParams(url: URL, bounds: MapBounds) {
    url.searchParams.append("minX", bounds.northWest.lng.toString());
    url.searchParams.append("maxX", bounds.southEast.lng.toString());
    url.searchParams.append("minY", bounds.southEast.lat.toString());
    url.searchParams.append("maxY", bounds.northWest.lat.toString());

    return url;
  }
}
