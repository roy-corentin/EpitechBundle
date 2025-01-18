import { Apis } from "../apis";
import { AppStore } from "../store";
import { PointOfInterestQuery } from "./PointOfInterestQuery";

export interface Queries {
  pointOfInterestQuery: PointOfInterestQuery;
}

export function initQueries(store: AppStore, apis: Apis) {
  const { pointOfInterestApi } = apis;

  return {
    pointOfInterestQuery: new PointOfInterestQuery(store, pointOfInterestApi),
  };
}
