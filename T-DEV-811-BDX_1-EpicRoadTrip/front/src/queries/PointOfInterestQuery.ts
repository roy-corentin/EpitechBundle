import { AppStore } from "../store";
import { PointOfInterestApiInterface } from "../apis/PointOfInterestApi";
import { markerApiParser } from "../parsers/MarkerApiParser";

export type POIType = "enjoy" | "eat" | "drink" | "sleep" | "travel";

export class PointOfInterestQuery {
  store: AppStore;
  api: PointOfInterestApiInterface;

  constructor(store: AppStore, api: PointOfInterestApiInterface) {
    this.store = store;
    this.api = api;
  }

  async call(type: POIType) {
    const response = await this.api[type](this.store.getState().mapBounds);

    if (!response.ok) return null;
    const responseJson = await response.json();
    const markersApi = responseJson["data"]["objects"];
    const markers = markersApi.map(markerApiParser);

    this.store.setState((state) => {
      const mapCenter = state.mapBounds.center;
      return {
        markers,
        position: [mapCenter.lat, mapCenter.lng],
      };
    });
  }
}
