import { PointOfInterestApiInterface, PointOfInteresteApi } from "./PointOfInterestApi";
import { SessionApi, SessionApiInterface } from "./SessionApi";

export interface Apis {
  pointOfInterestApi: PointOfInterestApiInterface;
  sessionApi: SessionApiInterface;
}

export function initApis(): Apis {
  return {
    pointOfInterestApi: new PointOfInteresteApi(),
    sessionApi: new SessionApi(),
  };
}
